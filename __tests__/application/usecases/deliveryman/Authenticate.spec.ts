import {
  DeliverymanNotFoundWithProvidedUsernameError,
  WrongPasswordError,
} from '@domain/errors';

import { AuthenticateDeliverymanUseCase } from '@application/usecases/deliveryman/Authenticate';

import {
  makeDeliverymanMock,
  makeDeliverymanTokenMock,
  makeErrorMock,
} from '../../../domain';
import {
  CompareHashProviderSpy,
  CreateDeliverymanTokenRepositorySpy,
  EncryptProviderSpy,
  FindDeliverymanByUsernameRepositorySpy,
  GenerateUuidProviderSpy,
  makeAuthenticateDeliverymanRefreshTokenExpiresTimeInMillissecondsMock,
  makeAuthenticateDeliverymanUseCaseInputMock,
  makeEncryptProviderOutputMock,
  makeGenerateUuidProviderOutputMock,
} from '../../mocks';

let findDeliverymanByUsernameRepositorySpy: FindDeliverymanByUsernameRepositorySpy;
let compareHashProviderSpy: CompareHashProviderSpy;
let encryptProviderSpy: EncryptProviderSpy;
let generateUuidProviderSpy: GenerateUuidProviderSpy;
let authenticateDeliverymanRefreshTokenExpiresTimeInMillissecondsMock: number;
let createDeliverymanTokenRepositorySpy: CreateDeliverymanTokenRepositorySpy;

let authenticateDeliverymanUseCase: AuthenticateDeliverymanUseCase;

describe('AuthenticateDeliverymanUseCase', () => {
  beforeEach(() => {
    findDeliverymanByUsernameRepositorySpy =
      new FindDeliverymanByUsernameRepositorySpy();
    compareHashProviderSpy = new CompareHashProviderSpy();
    encryptProviderSpy = new EncryptProviderSpy();
    generateUuidProviderSpy = new GenerateUuidProviderSpy();
    authenticateDeliverymanRefreshTokenExpiresTimeInMillissecondsMock =
      makeAuthenticateDeliverymanRefreshTokenExpiresTimeInMillissecondsMock();
    createDeliverymanTokenRepositorySpy =
      new CreateDeliverymanTokenRepositorySpy();

    authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase(
      findDeliverymanByUsernameRepositorySpy,
      compareHashProviderSpy,
      encryptProviderSpy,
      generateUuidProviderSpy,
      authenticateDeliverymanRefreshTokenExpiresTimeInMillissecondsMock,
      createDeliverymanTokenRepositorySpy
    );
  });

  it('should call FindDeliverymanByUsernameRepository once with correct values', async () => {
    const findByUsernameSpy = jest.spyOn(
      findDeliverymanByUsernameRepositorySpy,
      'findByUsername'
    );

    const input = makeAuthenticateDeliverymanUseCaseInputMock();

    await authenticateDeliverymanUseCase.execute(input);

    expect(findByUsernameSpy).toHaveBeenCalledTimes(1);
    expect(findByUsernameSpy).toHaveBeenCalledWith({
      username: input.username,
    });
  });

  it('should throw if FindDeliverymanByUsernameRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findDeliverymanByUsernameRepositorySpy, 'findByUsername')
      .mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateDeliverymanUseCaseInputMock();

    const promise = authenticateDeliverymanUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw DeliverymanNotFoundWithProvidedUsernameError if FindDeliverymanByUsernameRepository returns null', async () => {
    jest
      .spyOn(findDeliverymanByUsernameRepositorySpy, 'findByUsername')
      .mockResolvedValueOnce(null);

    const input = makeAuthenticateDeliverymanUseCaseInputMock();

    const promise = authenticateDeliverymanUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      DeliverymanNotFoundWithProvidedUsernameError
    );
  });

  it('should call CompareHashProvider once with correct values', async () => {
    const deliverymanMock = makeDeliverymanMock();

    jest
      .spyOn(findDeliverymanByUsernameRepositorySpy, 'findByUsername')
      .mockResolvedValueOnce(deliverymanMock);

    const compareSpy = jest.spyOn(compareHashProviderSpy, 'compare');

    const input = makeAuthenticateDeliverymanUseCaseInputMock();

    await authenticateDeliverymanUseCase.execute(input);

    expect(compareSpy).toHaveBeenCalledTimes(1);
    expect(compareSpy).toHaveBeenCalledWith({
      value: input.password,
      hashed_value: deliverymanMock.password_hash,
    });
  });

  it('should throw if CompareHashProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(compareHashProviderSpy, 'compare')
      .mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateDeliverymanUseCaseInputMock();

    const promise = authenticateDeliverymanUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw WrongPasswordError if CompareHashProvider returns false', async () => {
    jest.spyOn(compareHashProviderSpy, 'compare').mockResolvedValueOnce(false);

    const input = makeAuthenticateDeliverymanUseCaseInputMock();

    const promise = authenticateDeliverymanUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(WrongPasswordError);
  });

  it('should call EncryptProvider once with correct values', async () => {
    const deliverymanMock = makeDeliverymanMock();

    jest
      .spyOn(findDeliverymanByUsernameRepositorySpy, 'findByUsername')
      .mockResolvedValueOnce(deliverymanMock);

    const encryptSpy = jest.spyOn(encryptProviderSpy, 'encrypt');

    const input = makeAuthenticateDeliverymanUseCaseInputMock();

    await authenticateDeliverymanUseCase.execute(input);

    expect(encryptSpy).toHaveBeenCalledTimes(1);
    expect(encryptSpy).toHaveBeenCalledWith({
      subject: deliverymanMock.id,
      payload: {
        role: 'deliveryman',
      },
    });
  });

  it('should throw if EncryptProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(encryptProviderSpy, 'encrypt').mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateDeliverymanUseCaseInputMock();

    const promise = authenticateDeliverymanUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call GenerateUuidProvider once', async () => {
    const generateSpy = jest.spyOn(generateUuidProviderSpy, 'generate');

    const input = makeAuthenticateDeliverymanUseCaseInputMock();

    await authenticateDeliverymanUseCase.execute(input);

    expect(generateSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw if GenerateUuidProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateDeliverymanUseCaseInputMock();

    const promise = authenticateDeliverymanUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should call CreateDeliverymanTokenRepository once with correct values', async () => {
    const deliverymanMock = makeDeliverymanMock();

    jest
      .spyOn(findDeliverymanByUsernameRepositorySpy, 'findByUsername')
      .mockResolvedValueOnce(deliverymanMock);

    const generateUuidProviderOutput = makeGenerateUuidProviderOutputMock();

    jest
      .spyOn(generateUuidProviderSpy, 'generate')
      .mockResolvedValueOnce(generateUuidProviderOutput);

    const nowInMillisseconds = Date.now();

    jest.spyOn(Date, 'now').mockReturnValueOnce(nowInMillisseconds);

    const expiresIn = new Date(
      nowInMillisseconds +
        authenticateDeliverymanRefreshTokenExpiresTimeInMillissecondsMock
    );

    const createSpy = jest.spyOn(createDeliverymanTokenRepositorySpy, 'create');

    const input = makeAuthenticateDeliverymanUseCaseInputMock();

    await authenticateDeliverymanUseCase.execute(input);

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      token: generateUuidProviderOutput,
      deliveryman_id: deliverymanMock.id,
      expires_in: expiresIn,
    });
  });

  it('should throw if CreateDeliverymanTokenRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createDeliverymanTokenRepositorySpy, 'create')
      .mockRejectedValueOnce(errorMock);

    const input = makeAuthenticateDeliverymanUseCaseInputMock();

    const promise = authenticateDeliverymanUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return Authentication on success', async () => {
    const accessTokenMock = makeEncryptProviderOutputMock();

    jest
      .spyOn(encryptProviderSpy, 'encrypt')
      .mockResolvedValueOnce(accessTokenMock);

    const deliverymanTokenMock = makeDeliverymanTokenMock();

    jest
      .spyOn(createDeliverymanTokenRepositorySpy, 'create')
      .mockResolvedValueOnce(deliverymanTokenMock);

    const input = makeAuthenticateDeliverymanUseCaseInputMock();

    const output = await authenticateDeliverymanUseCase.execute(input);

    expect(output).toEqual({
      access_token: accessTokenMock,
      refresh_token: deliverymanTokenMock.token,
    });
  });
});
