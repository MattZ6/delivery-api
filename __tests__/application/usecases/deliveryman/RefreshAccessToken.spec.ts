import { faker } from '@faker-js/faker';

import {
  DeliverymanTokenExpiredError,
  DeliverymanTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';

import { RefreshDeliverymanAccessTokenUseCase } from '@application/usecases/deliveryman/RefreshAccessToken';

import { makeDeliverymanTokenMock, makeErrorMock } from '../../../domain';
import {
  CreateDeliverymanTokenRepositorySpy,
  DeleteDeliverymanTokenByIdRepositorySpy,
  EncryptProviderSpy,
  FindDeliverymanTokenByTokenRepositorySpy,
  GenerateUuidProviderSpy,
  makeEncryptProviderOutputMock,
  makeGenerateUuidProviderOutputMock,
  makeRefreshDeliverymanAccessTokenUseCaseInputMock,
  makeRefreshDeliverymanAccessTokenUseCaseRefreshTokenExpiresTimeInMillissecondsMock,
} from '../../mocks';

let findDeliverymanTokenByTokenRepositorySpy: FindDeliverymanTokenByTokenRepositorySpy;
let encryptProviderSpy: EncryptProviderSpy;
let generateUuidProviderSpy: GenerateUuidProviderSpy;
let refreshTokenExpiresTimeInMillissecondsMock: number;
let createDeliverymanTokenRepositorySpy: CreateDeliverymanTokenRepositorySpy;
let deleteDeliverymanTokenByIdRepositorySpy: DeleteDeliverymanTokenByIdRepositorySpy;

let refreshDeliverymanAccessTokenUseCase: RefreshDeliverymanAccessTokenUseCase;

function setValidTokenTimeMock() {
  const deliverymanTokenMock = makeDeliverymanTokenMock();

  const findByTokenSpy = jest
    .spyOn(findDeliverymanTokenByTokenRepositorySpy, 'findByToken')
    .mockResolvedValueOnce(deliverymanTokenMock);

  jest
    .spyOn(Date, 'now')
    .mockReturnValueOnce(deliverymanTokenMock.expires_in.getTime());

  return { deliverymanTokenMock, findByTokenSpy };
}

describe('RefreshDeliverymanAccessTokenUseCase', () => {
  beforeEach(() => {
    findDeliverymanTokenByTokenRepositorySpy =
      new FindDeliverymanTokenByTokenRepositorySpy();
    encryptProviderSpy = new EncryptProviderSpy();
    generateUuidProviderSpy = new GenerateUuidProviderSpy();
    refreshTokenExpiresTimeInMillissecondsMock =
      makeRefreshDeliverymanAccessTokenUseCaseRefreshTokenExpiresTimeInMillissecondsMock();
    createDeliverymanTokenRepositorySpy =
      new CreateDeliverymanTokenRepositorySpy();
    deleteDeliverymanTokenByIdRepositorySpy =
      new DeleteDeliverymanTokenByIdRepositorySpy();

    refreshDeliverymanAccessTokenUseCase =
      new RefreshDeliverymanAccessTokenUseCase(
        findDeliverymanTokenByTokenRepositorySpy,
        encryptProviderSpy,
        generateUuidProviderSpy,
        refreshTokenExpiresTimeInMillissecondsMock,
        createDeliverymanTokenRepositorySpy,
        deleteDeliverymanTokenByIdRepositorySpy
      );
  });

  it('should call FindDeliverymanTokenByTokenRepository once with correct values', async () => {
    const { findByTokenSpy } = setValidTokenTimeMock();

    const input = makeRefreshDeliverymanAccessTokenUseCaseInputMock();

    await refreshDeliverymanAccessTokenUseCase.execute(input);

    expect(findByTokenSpy).toHaveBeenCalledTimes(1);
    expect(findByTokenSpy).toHaveBeenCalledWith({
      token: input.refresh_token,
    });
  });

  it('should throw if FindDeliverymanTokenByTokenRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findDeliverymanTokenByTokenRepositorySpy, 'findByToken')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshDeliverymanAccessTokenUseCaseInputMock();

    const promise = refreshDeliverymanAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw DeliverymanTokenNotFoundWithProvidedTokenError if FindDeliverymanTokenByTokenRepository returns null', async () => {
    jest
      .spyOn(findDeliverymanTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(null);

    const input = makeRefreshDeliverymanAccessTokenUseCaseInputMock();

    const promise = refreshDeliverymanAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      DeliverymanTokenNotFoundWithProvidedTokenError
    );
  });

  it('should throw UserTokenExpiredError if token has expired', async () => {
    const deliverymanTokenMock = makeDeliverymanTokenMock();

    jest
      .spyOn(findDeliverymanTokenByTokenRepositorySpy, 'findByToken')
      .mockResolvedValueOnce(deliverymanTokenMock);

    jest
      .spyOn(Date, 'now')
      .mockReturnValueOnce(deliverymanTokenMock.expires_in.getTime() + 1);

    const input = makeRefreshDeliverymanAccessTokenUseCaseInputMock();

    const promise = refreshDeliverymanAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(DeliverymanTokenExpiredError);
  });

  it('should call EncryptProvider once with correct values', async () => {
    const { deliverymanTokenMock } = setValidTokenTimeMock();

    const encryptSpy = jest.spyOn(encryptProviderSpy, 'encrypt');

    const input = makeRefreshDeliverymanAccessTokenUseCaseInputMock();

    await refreshDeliverymanAccessTokenUseCase.execute(input);

    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith({
      subject: deliverymanTokenMock.deliveryman_id,
      payload: {
        role: 'deliveryman',
      },
    });
  });

  it('should throw if EncryptProvider throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest.spyOn(encryptProviderSpy, 'encrypt').mockRejectedValueOnce(errorMock);

    const input = makeRefreshDeliverymanAccessTokenUseCaseInputMock();

    const promise = refreshDeliverymanAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call GenerateUuidProvider once', async () => {
    setValidTokenTimeMock();

    const generateSpy = jest.spyOn(generateUuidProviderSpy, 'generate');

    const input = makeRefreshDeliverymanAccessTokenUseCaseInputMock();

    await refreshDeliverymanAccessTokenUseCase.execute(input);

    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if GenerateUuidProvider throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshDeliverymanAccessTokenUseCaseInputMock();

    const promise = refreshDeliverymanAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call CreateUserTokenRepository once with correct values', async () => {
    const { deliverymanTokenMock } = setValidTokenTimeMock();

    const now = faker.datatype.datetime();

    jest.spyOn(Date, 'now').mockReturnValueOnce(now.getTime());

    const token = makeGenerateUuidProviderOutputMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(token);

    const createSpy = jest.spyOn(createDeliverymanTokenRepositorySpy, 'create');

    const input = makeRefreshDeliverymanAccessTokenUseCaseInputMock();

    await refreshDeliverymanAccessTokenUseCase.execute(input);

    const expiresIn = new Date(
      now.getTime() + refreshTokenExpiresTimeInMillissecondsMock
    );

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      token,
      deliveryman_id: deliverymanTokenMock.deliveryman_id,
      expires_in: expiresIn,
    });
  });

  it('should throw if CreateUserTokenRepository throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest
      .spyOn(createDeliverymanTokenRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshDeliverymanAccessTokenUseCaseInputMock();

    const promise = refreshDeliverymanAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call DeleteUserTokenByIdRepository once with correct values', async () => {
    const { deliverymanTokenMock } = setValidTokenTimeMock();

    const deleteByIdSpy = jest.spyOn(
      deleteDeliverymanTokenByIdRepositorySpy,
      'deleteById'
    );

    const input = makeRefreshDeliverymanAccessTokenUseCaseInputMock();

    await refreshDeliverymanAccessTokenUseCase.execute(input);

    expect(deleteByIdSpy).toHaveBeenCalledTimes(1);
    expect(deleteByIdSpy).toHaveBeenCalledWith({ id: deliverymanTokenMock.id });
  });

  it('should throw if DeleteUserTokenByIdRepository throws', async () => {
    setValidTokenTimeMock();

    const errorMock = makeErrorMock();

    jest
      .spyOn(deleteDeliverymanTokenByIdRepositorySpy, 'deleteById')
      .mockRejectedValueOnce(errorMock);

    const input = makeRefreshDeliverymanAccessTokenUseCaseInputMock();

    const promise = refreshDeliverymanAccessTokenUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return Authentication on success', async () => {
    setValidTokenTimeMock();

    const accessToken = makeEncryptProviderOutputMock();

    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockResolvedValueOnce(accessToken);

    const deliverymanTokenMock = makeDeliverymanTokenMock();

    jest
      .spyOn(createDeliverymanTokenRepositorySpy, 'create')
      .mockResolvedValueOnce(deliverymanTokenMock);

    const input = makeRefreshDeliverymanAccessTokenUseCaseInputMock();

    const response = await refreshDeliverymanAccessTokenUseCase.execute(input);

    expect(response).toEqual({
      access_token: accessToken,
      refresh_token: deliverymanTokenMock.token,
    });
  });
});
