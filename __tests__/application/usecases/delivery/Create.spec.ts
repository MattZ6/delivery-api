import { ClientNotFoundWithProvidedIdError } from '@domain/errors';

import { CreateDeliveryUseCase } from '@application/usecases/delivery/Create';

import { makeDeliveryMock, makeErrorMock } from '../../../domain';
import {
  CheckIfClientExistsByIdRepositorySpy,
  CreateDeliveryRepositorySpy,
  makeCreateDeliveryUseCaseInputMock,
} from '../../mocks';

let checkIfClientExistsByIdRepositorySpy: CheckIfClientExistsByIdRepositorySpy;
let createDeliveryRepositorySpy: CreateDeliveryRepositorySpy;

let createDeliveryUseCase: CreateDeliveryUseCase;

describe('CreateDeliveryUseCase', () => {
  beforeEach(() => {
    checkIfClientExistsByIdRepositorySpy =
      new CheckIfClientExistsByIdRepositorySpy();
    createDeliveryRepositorySpy = new CreateDeliveryRepositorySpy();

    createDeliveryUseCase = new CreateDeliveryUseCase(
      checkIfClientExistsByIdRepositorySpy,
      createDeliveryRepositorySpy
    );
  });

  it('should call CheckIfClientExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfClientExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeCreateDeliveryUseCaseInputMock();

    await createDeliveryUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({
      id: input.client_id,
    });
  });

  it('should throw if CheckIfClientExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfClientExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateDeliveryUseCaseInputMock();

    const promise = createDeliveryUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw ClientNotFoundWithProvidedIdError if CheckIfClientExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfClientExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeCreateDeliveryUseCaseInputMock();

    const promise = createDeliveryUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      ClientNotFoundWithProvidedIdError
    );
  });

  it('should call CreateDeliveryRepository once with correct values', async () => {
    const createSpy = jest.spyOn(createDeliveryRepositorySpy, 'create');

    const input = makeCreateDeliveryUseCaseInputMock();

    await createDeliveryUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      client_id: input.client_id,
      item_name: input.item_name,
    });
  });

  it('should throw if CreateDeliveryRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createDeliveryRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateDeliveryUseCaseInputMock();

    const promise = createDeliveryUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return Delivery on success', async () => {
    const deliveryMock = makeDeliveryMock();

    jest
      .spyOn(createDeliveryRepositorySpy, 'create')
      .mockResolvedValueOnce(deliveryMock);

    const input = makeCreateDeliveryUseCaseInputMock();

    const output = await createDeliveryUseCase.execute(input);

    expect(output).toEqual(deliveryMock);
  });
});
