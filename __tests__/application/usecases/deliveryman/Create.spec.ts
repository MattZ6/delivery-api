import { DeliverymanAlreadyExistsWithProvidedUsernameError } from '@domain/errors';

import { CreateDeliverymanUseCase } from '@application/usecases/deliveryman/Create';

import { makeDeliverymanMock, makeErrorMock } from '../../../domain';
import {
  CheckIfDeliverymanExistsByUsernameRepositorySpy,
  CreateDeliverymanRepositorySpy,
  GenerateHashProviderSpy,
  makeCreateDeliverymanUseCaseInputMock,
  makeGenerateUuidProviderOutputMock,
} from '../../mocks';

let checkIfDeliverymanExistsByUsernameRepositorySpy: CheckIfDeliverymanExistsByUsernameRepositorySpy;
let generateHashProviderSpy: GenerateHashProviderSpy;
let createDeliverymanRepositorySpy: CreateDeliverymanRepositorySpy;

let createDeliverymanUseCase: CreateDeliverymanUseCase;

describe('CreateDeliverymanUseCase', () => {
  beforeEach(() => {
    checkIfDeliverymanExistsByUsernameRepositorySpy =
      new CheckIfDeliverymanExistsByUsernameRepositorySpy();
    generateHashProviderSpy = new GenerateHashProviderSpy();
    createDeliverymanRepositorySpy = new CreateDeliverymanRepositorySpy();

    createDeliverymanUseCase = new CreateDeliverymanUseCase(
      checkIfDeliverymanExistsByUsernameRepositorySpy,
      generateHashProviderSpy,
      createDeliverymanRepositorySpy
    );
  });

  it('should call CheckIfDeliverymanExistsByUsernameRepository once with correct values', async () => {
    const checkIfExistsByUsernameSpy = jest.spyOn(
      checkIfDeliverymanExistsByUsernameRepositorySpy,
      'checkIfExistsByUsername'
    );

    const input = makeCreateDeliverymanUseCaseInputMock();

    await createDeliverymanUseCase.execute(input);

    expect(checkIfExistsByUsernameSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByUsernameSpy).toHaveBeenCalledWith({
      username: input.username,
    });
  });

  it('should throw if CheckIfDeliverymanExistsByUsernameRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfDeliverymanExistsByUsernameRepositorySpy,
        'checkIfExistsByUsername'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateDeliverymanUseCaseInputMock();

    const promise = createDeliverymanUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw DeliverymanAlreadyExistsWithProvidedUsernameError if CheckIfDeliverymanExistsByUsernameRepository returns true', async () => {
    jest
      .spyOn(
        checkIfDeliverymanExistsByUsernameRepositorySpy,
        'checkIfExistsByUsername'
      )
      .mockResolvedValueOnce(true);

    const input = makeCreateDeliverymanUseCaseInputMock();

    const promise = createDeliverymanUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      DeliverymanAlreadyExistsWithProvidedUsernameError
    );
  });

  it('should call GenerateHashProvider once with correct values', async () => {
    const hashSpy = jest.spyOn(generateHashProviderSpy, 'hash');

    const input = makeCreateDeliverymanUseCaseInputMock();

    await createDeliverymanUseCase.execute(input);

    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(hashSpy).toHaveBeenCalledWith({
      value: input.password,
    });
  });

  it('should throw if GenerateHashProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateDeliverymanUseCaseInputMock();

    const promise = createDeliverymanUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call CreateDeliverymanRepository once with correct values', async () => {
    const generateHashProviderOutputMock = makeGenerateUuidProviderOutputMock();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockResolvedValueOnce(generateHashProviderOutputMock);

    const createSpy = jest.spyOn(createDeliverymanRepositorySpy, 'create');

    const input = makeCreateDeliverymanUseCaseInputMock();

    await createDeliverymanUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      username: input.username,
      password_hash: generateHashProviderOutputMock,
    });
  });

  it('should return Deliveryman on success', async () => {
    const deliverymanMock = makeDeliverymanMock();

    jest
      .spyOn(createDeliverymanRepositorySpy, 'create')
      .mockResolvedValueOnce(deliverymanMock);

    const input = makeCreateDeliverymanUseCaseInputMock();

    const output = await createDeliverymanUseCase.execute(input);

    expect(output).toEqual(deliverymanMock);
  });
});
