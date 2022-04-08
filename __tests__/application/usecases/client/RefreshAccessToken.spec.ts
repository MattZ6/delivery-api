import { faker } from '@faker-js/faker';

import {
  ClientTokenExpiredError,
  ClientTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';

import { RefreshClientAccessTokenUseCase } from '@application/usecases/client/RefreshAccessToken';

import { makeClientTokenMock, makeErrorMock } from '../../../domain';
import {
  CreateClientTokenRepositorySpy,
  DeleteClientTokenByIdRepositorySpy,
  EncryptProviderSpy,
  FindClientTokenByTokenRepositorySpy,
  GenerateUuidProviderSpy,
  makeEncryptProviderOutputMock,
  makeGenerateUuidProviderOutputMock,
  makeRefreshClientAccessTokenUseCaseInputMock,
  makeRefreshClientAccessTokenUseCaseRefreshTokenExpiresTimeInMillissecondsMock,
} from '../../mocks';

let findClientTokenByTokenRepositorySpy: FindClientTokenByTokenRepositorySpy;
let encryptProviderSpy: EncryptProviderSpy;
let generateUuidProviderSpy: GenerateUuidProviderSpy;
let refreshTokenExpiresTimeInMillissecondsMock: number;
let createClientTokenRepositorySpy: CreateClientTokenRepositorySpy;
let deleteClientTokenByIdRepositorySpy: DeleteClientTokenByIdRepositorySpy;

let refreshClientAccessTokenUseCase: RefreshClientAccessTokenUseCase;

function setValidTokenTimeMock() {
  const clientTokenMock = makeClientTokenMock();

  const findByTokenSpy = jest
    .spyOn(findClientTokenByTokenRepositorySpy, 'findByToken')
    .mockResolvedValueOnce(clientTokenMock);

  jest
    .spyOn(Date, 'now')
    .mockReturnValueOnce(clientTokenMock.expires_in.getTime());

  return { clientTokenMock, findByTokenSpy };
}

describe('RefreshClientAccessTokenUseCase', () => {
  beforeEach(() => {
    findClientTokenByTokenRepositorySpy =
      new FindClientTokenByTokenRepositorySpy();
    encryptProviderSpy = new EncryptProviderSpy();
    generateUuidProviderSpy = new GenerateUuidProviderSpy();
    refreshTokenExpiresTimeInMillissecondsMock =
      makeRefreshClientAccessTokenUseCaseRefreshTokenExpiresTimeInMillissecondsMock();
    createClientTokenRepositorySpy = new CreateClientTokenRepositorySpy();
    deleteClientTokenByIdRepositorySpy =
      new DeleteClientTokenByIdRepositorySpy();

    refreshClientAccessTokenUseCase = new RefreshClientAccessTokenUseCase(
      findClientTokenByTokenRepositorySpy,
      encryptProviderSpy,
      generateUuidProviderSpy,
      refreshTokenExpiresTimeInMillissecondsMock,
      createClientTokenRepositorySpy,
      deleteClientTokenByIdRepositorySpy
    );
  });

  it('should call FindClientTokenByTokenRepository once with correct values', async () => {
    const { findByTokenSpy } = setValidTokenTimeMock();

    const input = makeRefreshClientAccessTokenUseCaseInputMock();

    await refreshClientAccessTokenUseCase.execute(input);

    expect(findByTokenSpy).toHaveBeenCalledTimes(1);
    expect(findByTokenSpy).toHaveBeenCalledWith({
      token: input.refresh_token,
    });
  });

  it('should throw if FindClientTokenByTokenRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findClientTokenByTokenRepositorySpy, 'findByToken')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshClientAccessTokenUseCaseInputMock();

    const promise = refreshClientAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw ClientTokenNotFoundWithProvidedTokenError if FindClientTokenByTokenRepository returns null', async () => {
    jest
      .spyOn(findClientTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(null);

    const input = makeRefreshClientAccessTokenUseCaseInputMock();

    const promise = refreshClientAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      ClientTokenNotFoundWithProvidedTokenError
    );
  });

  it('should throw UserTokenExpiredError if token has expired', async () => {
    const clientTokenMock = makeClientTokenMock();

    jest
      .spyOn(findClientTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(clientTokenMock);

    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(clientTokenMock.expires_in.getTime() + 1);

    const input = makeRefreshClientAccessTokenUseCaseInputMock();

    const promise = refreshClientAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(ClientTokenExpiredError);
  });

  it('should call EncryptProvider once with correct values', async () => {
    const { clientTokenMock } = setValidTokenTimeMock();

    const encryptSpy = jest.spyOn(encryptProviderSpy, 'encrypt');

    const input = makeRefreshClientAccessTokenUseCaseInputMock();

    await refreshClientAccessTokenUseCase.execute(input);

    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith({
      subject: clientTokenMock.client_id,
      payload: {
        role: 'client',
      },
    });
  });

  it('should throw if EncryptProvider throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest.spyOn(encryptProviderSpy, 'encrypt').mockRejectedValueOnce(errorMock);

    const input = makeRefreshClientAccessTokenUseCaseInputMock();

    const promise = refreshClientAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call GenerateUuidProvider once', async () => {
    setValidTokenTimeMock();

    const generateSpy = jest.spyOn(generateUuidProviderSpy, 'generate');

    const input = makeRefreshClientAccessTokenUseCaseInputMock();

    await refreshClientAccessTokenUseCase.execute(input);

    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if GenerateUuidProvider throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshClientAccessTokenUseCaseInputMock();

    const promise = refreshClientAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call CreateUserTokenRepository once with correct values', async () => {
    const { clientTokenMock } = setValidTokenTimeMock();

    const now = faker.datatype.datetime();

    jest.spyOn(Date, 'now').mockReturnValueOnce(now.getTime());

    const token = makeGenerateUuidProviderOutputMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(token);

    const createSpy = jest.spyOn(createClientTokenRepositorySpy, 'create');

    const input = makeRefreshClientAccessTokenUseCaseInputMock();

    await refreshClientAccessTokenUseCase.execute(input);

    const expiresIn = new Date(
      now.getTime() + refreshTokenExpiresTimeInMillissecondsMock
    );

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      token,
      client_id: clientTokenMock.client_id,
      expires_in: expiresIn,
    });
  });

  it('should throw if CreateUserTokenRepository throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest
      .spyOn(createClientTokenRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshClientAccessTokenUseCaseInputMock();

    const promise = refreshClientAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call DeleteUserTokenByIdRepository once with correct values', async () => {
    const { clientTokenMock } = setValidTokenTimeMock();

    const deleteByIdSpy = jest.spyOn(
      deleteClientTokenByIdRepositorySpy,
      'deleteById'
    );

    const input = makeRefreshClientAccessTokenUseCaseInputMock();

    await refreshClientAccessTokenUseCase.execute(input);

    expect(deleteByIdSpy).toHaveBeenCalledTimes(1);
    expect(deleteByIdSpy).toHaveBeenCalledWith({ id: clientTokenMock.id });
  });

  it('should throw if DeleteUserTokenByIdRepository throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest
      .spyOn(deleteClientTokenByIdRepositorySpy, 'deleteById')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshClientAccessTokenUseCaseInputMock();

    const promise = refreshClientAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return Authentication on success', async () => {
    setValidTokenTimeMock();

    const accessToken = makeEncryptProviderOutputMock();

    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockResolvedValueOnce(accessToken);

    const clientTokenMock = makeClientTokenMock();

    jest
      .spyOn(createClientTokenRepositorySpy, 'create')
      .mockResolvedValueOnce(clientTokenMock);

    const input = makeRefreshClientAccessTokenUseCaseInputMock();

    const response = await refreshClientAccessTokenUseCase.execute(input);

    expect(response).toEqual({
      access_token: accessToken,
      refresh_token: clientTokenMock.token,
    });
  });
});
