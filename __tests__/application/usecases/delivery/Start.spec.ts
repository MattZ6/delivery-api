import { faker } from '@faker-js/faker';

import {
  DeliveryAlreadyStartedError,
  DeliverymanNotFoundWithProvidedIdError,
  DeliveryNotFoundWithProvidedIdError,
} from '@domain/errors';

import { StartDeliveryUseCase } from '@application/usecases/delivery/Start';

import { makeDeliveryMock, makeErrorMock } from '../../../domain';
import {
  CheckIfDeliverymanExistsByIdRepositorySpy,
  FindDeliveryByIdRepositorySpy,
  makeStartDeliveryUseCaseInputMock,
  UpdateDeliveryRepositorySpy,
} from '../../mocks';

let findDeliveryByIdRepositorySpy: FindDeliveryByIdRepositorySpy;
let checkIfDeliverymanExistsByIdRepositorySpy: CheckIfDeliverymanExistsByIdRepositorySpy;
let updateDeliveryRepositorySpy: UpdateDeliveryRepositorySpy;

let startDeliveryUseCase: StartDeliveryUseCase;

describe('StartDeliveryUseCase', () => {
  beforeEach(() => {
    findDeliveryByIdRepositorySpy = new FindDeliveryByIdRepositorySpy();
    checkIfDeliverymanExistsByIdRepositorySpy =
      new CheckIfDeliverymanExistsByIdRepositorySpy();
    updateDeliveryRepositorySpy = new UpdateDeliveryRepositorySpy();

    startDeliveryUseCase = new StartDeliveryUseCase(
      findDeliveryByIdRepositorySpy,
      checkIfDeliverymanExistsByIdRepositorySpy,
      updateDeliveryRepositorySpy
    );
  });

  it('should call FindDeliveryByIdRepository once with correct values', async () => {
    const findByIdSpy = jest.spyOn(findDeliveryByIdRepositorySpy, 'findById');

    const input = makeStartDeliveryUseCaseInputMock();

    await startDeliveryUseCase.execute(input);

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

    const input = makeStartDeliveryUseCaseInputMock();

    const promise = startDeliveryUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw DeliveryNotFoundWithProvidedIdError if FindDeliveryByIdRepository returns null', async () => {
    jest
      .spyOn(findDeliveryByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(null);

    const input = makeStartDeliveryUseCaseInputMock();

    const promise = startDeliveryUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      DeliveryNotFoundWithProvidedIdError
    );
  });

  it('should throw DeliveryAlreadyStartedError if delivery has a delivery_id', async () => {
    const deliveryMock = makeDeliveryMock();

    deliveryMock.deliveryman_id = faker.datatype.uuid();

    jest
      .spyOn(findDeliveryByIdRepositorySpy, 'findById')
      .mockResolvedValueOnce(deliveryMock);

    const input = makeStartDeliveryUseCaseInputMock();

    const promise = startDeliveryUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(DeliveryAlreadyStartedError);
  });

  it('should call CheckIfDeliverymanExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfDeliverymanExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeStartDeliveryUseCaseInputMock();

    await startDeliveryUseCase.execute(input);

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

    const input = makeStartDeliveryUseCaseInputMock();

    const promise = startDeliveryUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw if CheckIfDeliverymanExistsByIdRepository throws', async () => {
    jest
      .spyOn(checkIfDeliverymanExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeStartDeliveryUseCaseInputMock();

    const promise = startDeliveryUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      DeliverymanNotFoundWithProvidedIdError
    );
  });

  it('should call UpdateDeliveryRepository once with correct values', async () => {
    const updateSpy = jest.spyOn(updateDeliveryRepositorySpy, 'update');

    const input = makeStartDeliveryUseCaseInputMock();

    await startDeliveryUseCase.execute(input);

    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith({
      id: input.delivery_id,
      deliveryman_id: input.deliveryman_id,
    });
  });

  it('should throw if UpdateDeliveryRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(updateDeliveryRepositorySpy, 'update')
      .mockRejectedValueOnce(errorMock);

    const input = makeStartDeliveryUseCaseInputMock();

    const promise = startDeliveryUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return the updated delivery on success', async () => {
    const deliveryMock = makeDeliveryMock();

    jest
      .spyOn(updateDeliveryRepositorySpy, 'update')
      .mockResolvedValueOnce(deliveryMock);

    const input = makeStartDeliveryUseCaseInputMock();

    const output = await startDeliveryUseCase.execute(input);

    expect(output).toEqual(deliveryMock);
  });
});
