import {
  ClientNotFoundWithProvidedUsernameError,
  WrongPasswordError,
} from '@domain/errors';

import { AuthenticateClientUseCase } from '@application/usecases/client/Authenticate';

import {
  makeClientMock,
  makeClientTokenMock,
  makeErrorMock,
} from '../../../domain';
import {
  CompareHashProviderSpy,
  CreateClientTokenRepositorySpy,
  EncryptProviderSpy,
  FindClientByUsernameRepositorySpy,
  GenerateUuidProviderSpy,
  makeAuthenticateClientRefreshTokenExpiresTimeInMillissecondsMock,
  makeAuthenticateClientUseCaseInputMock,
  makeEncryptProviderOutputMock,
  makeGenerateUuidProviderOutputMock,
} from '../../mocks';

let findClientByUsernameRepositorySpy: FindClientByUsernameRepositorySpy;
let compareHashProviderSpy: CompareHashProviderSpy;
let encryptProviderSpy: EncryptProviderSpy;
let generateUuidProviderSpy: GenerateUuidProviderSpy;
let authenticateClientRefreshTokenExpiresTimeInMillissecondsMock: number;
let createClientTokenRepositorySpy: CreateClientTokenRepositorySpy;

let authenticateClientUseCase: AuthenticateClientUseCase;

describe('AuthenticateClientUseCase', () => {
  beforeEach(() => {
    findClientByUsernameRepositorySpy = new FindClientByUsernameRepositorySpy();
    compareHashProviderSpy = new CompareHashProviderSpy();
    encryptProviderSpy = new EncryptProviderSpy();
    generateUuidProviderSpy = new GenerateUuidProviderSpy();
    authenticateClientRefreshTokenExpiresTimeInMillissecondsMock =
      makeAuthenticateClientRefreshTokenExpiresTimeInMillissecondsMock();
    createClientTokenRepositorySpy = new CreateClientTokenRepositorySpy();

    authenticateClientUseCase = new AuthenticateClientUseCase(
      findClientByUsernameRepositorySpy,
      compareHashProviderSpy,
      encryptProviderSpy,
      generateUuidProviderSpy,
      authenticateClientRefreshTokenExpiresTimeInMillissecondsMock,
      createClientTokenRepositorySpy
    );
  });

  it('should call FindClientByUsernameRepository once with correct values', async () => {
    const findByUsernameSpy = jest.spyOn(
      findClientByUsernameRepositorySpy,
      'findByUsername'
    );

    const input = makeAuthenticateClientUseCaseInputMock();

    await authenticateClientUseCase.execute(input);

    expect(findByUsernameSpy).toHaveBeenCalledTimes(1);
    expect(findByUsernameSpy).toHaveBeenCalledWith({
      username: input.username,
    });
  });

  it('should throw if FindClientByUsernameRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findClientByUsernameRepositorySpy, 'findByUsername')
      .mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateClientUseCaseInputMock();

    const promise = authenticateClientUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw ClientNotFoundWithProvidedUsernameError if FindClientByUsernameRepository returns null', async () => {
    jest
      .spyOn(findClientByUsernameRepositorySpy, 'findByUsername')
      .mockResolvedValueOnce(null);

    const input = makeAuthenticateClientUseCaseInputMock();

    const promise = authenticateClientUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      ClientNotFoundWithProvidedUsernameError
    );
  });

  it('should call CompareHashProvider once with correct values', async () => {
    const clientMock = makeClientMock();

    jest
      .spyOn(findClientByUsernameRepositorySpy, 'findByUsername')
      .mockResolvedValueOnce(clientMock);

    const compareSpy = jest.spyOn(compareHashProviderSpy, 'compare');

    const input = makeAuthenticateClientUseCaseInputMock();

    await authenticateClientUseCase.execute(input);

    expect(compareSpy).toHaveBeenCalledTimes(1);
    expect(compareSpy).toHaveBeenCalledWith({
      value: input.password,
      hashed_value: clientMock.password_hash,
    });
  });

  it('should throw if CompareHashProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(compareHashProviderSpy, 'compare')
      .mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateClientUseCaseInputMock();

    const promise = authenticateClientUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw WrongPasswordError if CompareHashProvider returns false', async () => {
    jest.spyOn(compareHashProviderSpy, 'compare').mockResolvedValueOnce(false);

    const input = makeAuthenticateClientUseCaseInputMock();

    const promise = authenticateClientUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(WrongPasswordError);
  });

  it('should call EncryptProvider once with correct values', async () => {
    const clientMock = makeClientMock();

    jest
      .spyOn(findClientByUsernameRepositorySpy, 'findByUsername')
      .mockResolvedValueOnce(clientMock);

    const encryptSpy = jest.spyOn(encryptProviderSpy, 'encrypt');

    const input = makeAuthenticateClientUseCaseInputMock();

    await authenticateClientUseCase.execute(input);

    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith({
      subject: clientMock.id,
      payload: {
        role: 'client',
      },
    });
  });

  it('should throw if EncryptProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(encryptProviderSpy, 'encrypt').mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateClientUseCaseInputMock();

    const promise = authenticateClientUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call GenerateUuidProvider once', async () => {
    const generateSpy = jest.spyOn(generateUuidProviderSpy, 'generate');

    const input = makeAuthenticateClientUseCaseInputMock();

    await authenticateClientUseCase.execute(input);

    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if GenerateUuidProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateClientUseCaseInputMock();

    const promise = authenticateClientUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call CreateClientTokenRepository once with correct values', async () => {
    const clientMock = makeClientMock();

    jest
      .spyOn(findClientByUsernameRepositorySpy, 'findByUsername')
      .mockResolvedValueOnce(clientMock);

    const generateUuidProviderOutput = makeGenerateUuidProviderOutputMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(generateUuidProviderOutput);

    const nowInMillisseconds = Date.now();

    jest.spyOn(Date, 'now').mockReturnValueOnce(nowInMillisseconds);

    const expiresIn = new Date(
      nowInMillisseconds +
        authenticateClientRefreshTokenExpiresTimeInMillissecondsMock
    );

    const createSpy = jest.spyOn(createClientTokenRepositorySpy, 'create');

    const input = makeAuthenticateClientUseCaseInputMock();

    await authenticateClientUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      token: generateUuidProviderOutput,
      client_id: clientMock.id,
      expires_in: expiresIn,
    });
  });

  it('should throw if CreateClientTokenRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createClientTokenRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateClientUseCaseInputMock();

    const promise = authenticateClientUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return Authentication on success', async () => {
    const accessTokenMock = makeEncryptProviderOutputMock();

    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockResolvedValueOnce(accessTokenMock);

    const clientTokenMock = makeClientTokenMock();

    jest
      .spyOn(createClientTokenRepositorySpy, 'create')
      .mockResolvedValueOnce(clientTokenMock);

    const input = makeAuthenticateClientUseCaseInputMock();

    const output = await authenticateClientUseCase.execute(input);

    expect(output).toEqual({
      access_token: accessTokenMock,
      refresh_token: clientTokenMock.token,
    });
  });
});
