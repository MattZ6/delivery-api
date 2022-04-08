import { faker } from '@faker-js/faker';

import {
  DeliveryAlreadyFinishedError,
  DeliverymanNotFoundWithProvidedIdError,
  DeliveryNotFoundWithProvidedIdError,
  DeliveryNotStartedError,
  DeliveryStartedByAnotherDeliverymanError,
} from '@domain/errors';

import { DeliverDeliveryUseCase } from '@application/usecases/delivery/Deliver';

import { makeDeliveryMock, makeErrorMock } from '../../../domain';
import {
  CheckIfDeliverymanExistsByIdRepositorySpy,
  FindDeliveryByIdRepositorySpy,
  makeDeliverDeliveryUseCaseInputMock,
  UpdateDeliveryRepositorySpy,
} from '../../mocks';

let findDeliveryByIdRepositorySpy: FindDeliveryByIdRepositorySpy;
let checkIfDeliverymanExistsByIdRepositorySpy: CheckIfDeliverymanExistsByIdRepositorySpy;
let updateDeliveryRepositorySpy: UpdateDeliveryRepositorySpy;

let deliverDeliveryUseCase: DeliverDeliveryUseCase;

function makeValidDelivery(deliverymanId?: string) {
  const deliveryMock = makeDeliveryMock();

  deliveryMock.deliveryman_id = deliverymanId;

  const findByIdSpy = jest
    .spyOn(findDeliveryByIdRepositorySpy, 'findById')
    .mockResolvedValueOnce(deliveryMock);

  return { deliveryMock, findByIdSpy };
}

describe('DeliverDeliveryUseCase', () => {
  beforeEach(() => {
    findDeliveryByIdRepositorySpy = new FindDeliveryByIdRepositorySpy();
    checkIfDeliverymanExistsByIdRepositorySpy =
      new CheckIfDeliverymanExistsByIdRepositorySpy();
    updateDeliveryRepositorySpy = new UpdateDeliveryRepositorySpy();

    deliverDeliveryUseCase = new DeliverDeliveryUseCase(
      findDeliveryByIdRepositorySpy,
      checkIfDeliverymanExistsByIdRepositorySpy,
      updateDeliveryRepositorySpy
    );
  });

  it('should call FindDeliveryByIdRepository once with correct values', async () => {
    const input = makeDeliverDeliveryUseCaseInputMock();

    const { findByIdSpy } = makeValidDelivery(input.deliveryman_id);

    await deliverDeliveryUseCase.execute(input);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith({
      id: input.delivery_id,
    });
  });

  it('should throw if FindDeliveryByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findDeliveryByIdRepositorySpy, 'findById')
      .mockRejectedValueOnce(errorMock);

    const input = makeDeliverDeliveryUseCaseInputMock();

    const promise = deliverDeliveryUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw DeliveryNotFoundWithProvidedIdError if FindDeliveryByIdRepository returns null', async () => {
    jest
      .spyOn(findDeliveryByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const input = makeDeliverDeliveryUseCaseInputMock();

    const promise = deliverDeliveryUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      DeliveryNotFoundWithProvidedIdError
    );
  });

  it('should throw DeliveryNotStartedError if the delivery does not have a delivery_man', async () => {
    const deliveryMock = makeDeliveryMock();

    deliveryMock.deliveryman_id = undefined;

    jest
      .spyOn(findDeliveryByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(deliveryMock);

    const input = makeDeliverDeliveryUseCaseInputMock();

    const promise = deliverDeliveryUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(DeliveryNotStartedError);
  });

  it('should throw DeliveryNotStartedError if the delivery not have a deliveryman_id', async () => {
    const deliveryMock = makeDeliveryMock();

    deliveryMock.deliveryman_id = null;

    jest
      .spyOn(findDeliveryByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const input = makeDeliverDeliveryUseCaseInputMock();

    const promise = deliverDeliveryUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      DeliveryNotFoundWithProvidedIdError
    );
  });

  it('should call CheckIfDeliverymanExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfDeliverymanExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeDeliverDeliveryUseCaseInputMock();

    makeValidDelivery(input.deliveryman_id);

    await deliverDeliveryUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({
      id: input.deliveryman_id,
    });
  });

  it('should throw if CheckIfDeliverymanExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfDeliverymanExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeDeliverDeliveryUseCaseInputMock();

    makeValidDelivery(input.deliveryman_id);

    const promise = deliverDeliveryUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw DeliverymanNotFoundWithProvidedIdError if CheckIfDeliverymanExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfDeliverymanExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeDeliverDeliveryUseCaseInputMock();

    makeValidDelivery(input.deliveryman_id);

    const promise = deliverDeliveryUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      DeliverymanNotFoundWithProvidedIdError
    );
  });

  it('should throw DeliveryStartedByAnotherDeliverymanError if delivery deliveryman_id is different from provided deliveryman_id', async () => {
    const deliveryMock = makeDeliveryMock();

    deliveryMock.deliveryman_id = faker.datatype.uuid();
    deliveryMock.delivered_at = undefined;

    jest
      .spyOn(findDeliveryByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(deliveryMock);

    const input = makeDeliverDeliveryUseCaseInputMock();

    const promise = deliverDeliveryUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      DeliveryStartedByAnotherDeliverymanError
    );
  });

  it('should throw DeliveryAlreadyFinishedError if delivery has delivered_at', async () => {
    const deliveryMock = makeDeliveryMock();

    deliveryMock.deliveryman_id = faker.datatype.uuid();
    deliveryMock.delivered_at = faker.datatype.datetime();

    jest
      .spyOn(findDeliveryByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(deliveryMock);

    const input = makeDeliverDeliveryUseCaseInputMock();

    input.deliveryman_id = deliveryMock.deliveryman_id;

    const promise = deliverDeliveryUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(DeliveryAlreadyFinishedError);
  });

  it('should call UpdateDeliveryRepository once with correct values', async () => {
    const updateSpy = jest.spyOn(updateDeliveryRepositorySpy, 'update');

    const now = faker.datatype.datetime();

    jest.spyOn(Date, 'now').mockReturnValueOnce(now.getTime());

    const input = makeDeliverDeliveryUseCaseInputMock();

    makeValidDelivery(input.deliveryman_id);

    await deliverDeliveryUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      id: input.delivery_id,
      delivered_at: now,
    });
  });

  it('should throw if UpdateDeliveryRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateDeliveryRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeDeliverDeliveryUseCaseInputMock();

    makeValidDelivery(input.deliveryman_id);

    const promise = deliverDeliveryUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw if UpdateDeliveryRepository throws', async () => {
    const deliveryMock = makeDeliveryMock();

    jest
      .spyOn(updateDeliveryRepositorySpy, 'update')
      .mockResolvedValueOnce(deliveryMock);

    const input = makeDeliverDeliveryUseCaseInputMock();

    makeValidDelivery(input.deliveryman_id);

    const output = await deliverDeliveryUseCase.execute(input);

    expect(output).toEqual(deliveryMock);
  });
});
