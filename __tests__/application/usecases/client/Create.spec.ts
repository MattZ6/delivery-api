import { ClientAlreadyExistsWithProvidedUsernameError } from '@domain/errors';

import { CreateClientUseCase } from '@application/usecases/client/Create';

import { makeClientMock, makeErrorMock } from '../../../domain';
import {
  CheckIfClientExistsByUsernameRepositorySpy,
  CreateClientRepositorySpy,
  GenerateHashProviderSpy,
  makeCreateClientUseCaseInputMock,
  makeGenerateUuidProviderOutputMock,
} from '../../mocks';

let checkIfClientExistsByUsernameRepositorySpy: CheckIfClientExistsByUsernameRepositorySpy;
let generateHashProviderSpy: GenerateHashProviderSpy;
let createClientRepositorySpy: CreateClientRepositorySpy;

let createClientUseCase: CreateClientUseCase;

describe('CreateClientUseCase', () => {
  beforeEach(() => {
    checkIfClientExistsByUsernameRepositorySpy =
      new CheckIfClientExistsByUsernameRepositorySpy();
    generateHashProviderSpy = new GenerateHashProviderSpy();
    createClientRepositorySpy = new CreateClientRepositorySpy();

    createClientUseCase = new CreateClientUseCase(
      checkIfClientExistsByUsernameRepositorySpy,
      generateHashProviderSpy,
      createClientRepositorySpy
    );
  });

  it('should call CheckIfClientExistsByUsernameRepository once with correct values', async () => {
    const checkIfExistsByUsernameSpy = jest.spyOn(
      checkIfClientExistsByUsernameRepositorySpy,
      'checkIfExistsByUsername'
    );

    const input = makeCreateClientUseCaseInputMock();

    await createClientUseCase.execute(input);

    expect(checkIfExistsByUsernameSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByUsernameSpy).toHaveBeenCalledWith({
      username: input.username,
    });
  });

  it('should throw if CheckIfClientExistsByUsernameRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        checkIfClientExistsByUsernameRepositorySpy,
        'checkIfExistsByUsername'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeCreateClientUseCaseInputMock();

    const promise = createClientUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw ClientAlreadyExistsWithProvidedUsernameError if CheckIfClientExistsByUsernameRepository returns true', async () => {
    jest
      .spyOn(
        checkIfClientExistsByUsernameRepositorySpy,
        'checkIfExistsByUsername'
      )
      .mockResolvedValueOnce(true);

    const input = makeCreateClientUseCaseInputMock();

    const promise = createClientUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      ClientAlreadyExistsWithProvidedUsernameError
    );
  });

  it('should call GenerateHashProvider once with correct values', async () => {
    const hashSpy = jest.spyOn(generateHashProviderSpy, 'hash');

    const input = makeCreateClientUseCaseInputMock();

    await createClientUseCase.execute(input);

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

    const input = makeCreateClientUseCaseInputMock();

    const promise = createClientUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call CreateClientRepository once with correct values', async () => {
    const generateHashProviderOutputMock = makeGenerateUuidProviderOutputMock();

    jest
      .spyOn(generateHashProviderSpy, 'hash')
      .mockResolvedValueOnce(generateHashProviderOutputMock);

    const createSpy = jest.spyOn(createClientRepositorySpy, 'create');

    const input = makeCreateClientUseCaseInputMock();

    await createClientUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      username: input.username,
      password_hash: generateHashProviderOutputMock,
    });
  });

  it('should return Client on success', async () => {
    const clientMock = makeClientMock();

    jest
      .spyOn(createClientRepositorySpy, 'create')
      .mockResolvedValueOnce(clientMock);

    const input = makeCreateClientUseCaseInputMock();

    const output = await createClientUseCase.execute(input);

    expect(output).toEqual(clientMock);
  });
});
