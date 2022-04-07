import {
  DeliverymanTokenExpiredError,
  DeliverymanTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';

import { RefreshDeliverymanAccessTokenController } from '@presentation/controllers/deliveryman/RefreshAccessToken';
import {
  badRequest,
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  makeRefreshDeliverymanAccessTokenControllerRequestMock,
  makeRefreshDeliverymanAccessTokenUseCaseOutputMock,
  makeValidationErrorMock,
  RefreshDeliverymanAccessTokenUseCaseSpy,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let refreshDeliverymanAccessTokenUseCaseSpy: RefreshDeliverymanAccessTokenUseCaseSpy;

let refreshDeliverymanAccessTokenController: RefreshDeliverymanAccessTokenController;

describe('RefreshDeliverymanAccessTokenController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    refreshDeliverymanAccessTokenUseCaseSpy =
      new RefreshDeliverymanAccessTokenUseCaseSpy();

    refreshDeliverymanAccessTokenController =
      new RefreshDeliverymanAccessTokenController(
        validationSpy,
        refreshDeliverymanAccessTokenUseCaseSpy
      );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const requestMock =
      makeRefreshDeliverymanAccessTokenControllerRequestMock();

    await refreshDeliverymanAccessTokenController.handle(requestMock);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(requestMock.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const requestMock =
      makeRefreshDeliverymanAccessTokenControllerRequestMock();

    const promise = refreshDeliverymanAccessTokenController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const requestMock =
      makeRefreshDeliverymanAccessTokenControllerRequestMock();

    const response = await refreshDeliverymanAccessTokenController.handle(
      requestMock
    );

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call RefreshDeliverymanAccessTokenUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(
      refreshDeliverymanAccessTokenUseCaseSpy,
      'execute'
    );

    const requestMock =
      makeRefreshDeliverymanAccessTokenControllerRequestMock();

    await refreshDeliverymanAccessTokenController.handle(requestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      refresh_token: requestMock.body.refresh_token,
    });
  });

  it('should throw if RefreshDeliverymanAccessTokenUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(refreshDeliverymanAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock =
      makeRefreshDeliverymanAccessTokenControllerRequestMock();

    const promise = refreshDeliverymanAccessTokenController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should returns not found (404) if RefreshDeliverymanAccessTokenUseCase throws a DeliverymanTokenNotFoundWithProvidedTokenError', async () => {
    const errorMock = new DeliverymanTokenNotFoundWithProvidedTokenError();

    jest
      .spyOn(refreshDeliverymanAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock =
      makeRefreshDeliverymanAccessTokenControllerRequestMock();

    const response = await refreshDeliverymanAccessTokenController.handle(
      requestMock
    );

    expect(response).toEqual(notFound(errorMock));
  });

  it('should returns unprocessable entity (422) if RefreshDeliverymanAccessTokenUseCase throws a DeliverymanTokenExpiredError', async () => {
    const errorMock = new DeliverymanTokenExpiredError();

    jest
      .spyOn(refreshDeliverymanAccessTokenUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock =
      makeRefreshDeliverymanAccessTokenControllerRequestMock();

    const response = await refreshDeliverymanAccessTokenController.handle(
      requestMock
    );

    expect(response).toEqual(unprocessableEntity(errorMock));
  });

  it('should return ok (200) if AuthenticateClientUseCase returns the Authentication', async () => {
    const output = makeRefreshDeliverymanAccessTokenUseCaseOutputMock();

    jest
      .spyOn(refreshDeliverymanAccessTokenUseCaseSpy, 'execute')
      .mockResolvedValueOnce(output);

    const requestMock =
      makeRefreshDeliverymanAccessTokenControllerRequestMock();

    const response = await refreshDeliverymanAccessTokenController.handle(
      requestMock
    );

    expect(response).toEqual(ok(output));
  });
});
