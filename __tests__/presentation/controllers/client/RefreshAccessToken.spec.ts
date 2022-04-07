import {
  ClientTokenExpiredError,
  ClientTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';

import { RefreshClientAccessTokenController } from '@presentation/controllers/client/RefreshAccessToken';
import {
  badRequest,
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  makeRefreshClientAccessTokenControllerRequestMock,
  makeRefreshClientAccessTokenUseCaseOutputMock,
  makeValidationErrorMock,
  RefreshClientAccessTokenUseCaseSpy,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let refreshClientAccessTokenUseCaseSpy: RefreshClientAccessTokenUseCaseSpy;

let refreshClientAccessTokenController: RefreshClientAccessTokenController;

describe('RefreshClientAccessTokenController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    refreshClientAccessTokenUseCaseSpy =
      new RefreshClientAccessTokenUseCaseSpy();

    refreshClientAccessTokenController = new RefreshClientAccessTokenController(
      validationSpy,
      refreshClientAccessTokenUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const requestMock = makeRefreshClientAccessTokenControllerRequestMock();

    await refreshClientAccessTokenController.handle(requestMock);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(requestMock.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const requestMock = makeRefreshClientAccessTokenControllerRequestMock();

    const promise = refreshClientAccessTokenController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const requestMock = makeRefreshClientAccessTokenControllerRequestMock();

    const response = await refreshClientAccessTokenController.handle(
      requestMock
    );

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call RefreshClientAccessTokenUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(
      refreshClientAccessTokenUseCaseSpy,
      'execute'
    );

    const requestMock = makeRefreshClientAccessTokenControllerRequestMock();

    await refreshClientAccessTokenController.handle(requestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      refresh_token: requestMock.body.refresh_token,
    });
  });

  it('should throw if RefreshClientAccessTokenUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(refreshClientAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeRefreshClientAccessTokenControllerRequestMock();

    const promise = refreshClientAccessTokenController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should returns not found (404) if RefreshClientAccessTokenUseCase throws a ClientTokenNotFoundWithProvidedTokenError', async () => {
    const errorMock = new ClientTokenNotFoundWithProvidedTokenError();

    jest
      .spyOn(refreshClientAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeRefreshClientAccessTokenControllerRequestMock();

    const response = await refreshClientAccessTokenController.handle(
      requestMock
    );

    expect(response).toEqual(notFound(errorMock));
  });

  it('should returns unprocessable entity (422) if RefreshClientAccessTokenUseCase throws a ClientTokenExpiredError', async () => {
    const errorMock = new ClientTokenExpiredError();

    jest
      .spyOn(refreshClientAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeRefreshClientAccessTokenControllerRequestMock();

    const response = await refreshClientAccessTokenController.handle(
      requestMock
    );

    expect(response).toEqual(unprocessableEntity(errorMock));
  });

  it('should return ok (200) if AuthenticateClientUseCase returns the Authentication', async () => {
    const output = makeRefreshClientAccessTokenUseCaseOutputMock();

    jest
      .spyOn(refreshClientAccessTokenUseCaseSpy, 'execute')
      .mockResolvedValueOnce(output);

    const requestMock = makeRefreshClientAccessTokenControllerRequestMock();

    const response = await refreshClientAccessTokenController.handle(
      requestMock
    );

    expect(response).toEqual(ok(output));
  });
});
