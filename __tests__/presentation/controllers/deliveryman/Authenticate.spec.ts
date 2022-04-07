import {
  DeliverymanNotFoundWithProvidedUsernameError,
  WrongPasswordError,
} from '@domain/errors';

import { AuthenticateDeliverymanController } from '@presentation/controllers/deliveryman/Authenticate';
import {
  badRequest,
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  AuthenticateDeliverymanUseCaseSpy,
  makeAuthenticateDeliverymanControllerRequestMock,
  makeAuthenticateDeliverymanUseCaseOutputMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let authenticateDeliverymanUseCaseSpy: AuthenticateDeliverymanUseCaseSpy;

let authenticateDeliverymanController: AuthenticateDeliverymanController;

describe('AuthenticateDeliverymanController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    authenticateDeliverymanUseCaseSpy = new AuthenticateDeliverymanUseCaseSpy();

    authenticateDeliverymanController = new AuthenticateDeliverymanController(
      validationSpy,
      authenticateDeliverymanUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const requestMock = makeAuthenticateDeliverymanControllerRequestMock();

    await authenticateDeliverymanController.handle(requestMock);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(requestMock.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const requestMock = makeAuthenticateDeliverymanControllerRequestMock();

    const promise = authenticateDeliverymanController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const requestMock = makeAuthenticateDeliverymanControllerRequestMock();

    const response = await authenticateDeliverymanController.handle(
      requestMock
    );

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call AuthenticateDeliverymanUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(authenticateDeliverymanUseCaseSpy, 'execute');

    const requestMock = makeAuthenticateDeliverymanControllerRequestMock();

    await authenticateDeliverymanController.handle(requestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      username: requestMock.body.username,
      password: requestMock.body.password,
    });
  });

  it('should throw if AuthenticateDeliverymanUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(authenticateDeliverymanUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeAuthenticateDeliverymanControllerRequestMock();

    const promise = authenticateDeliverymanController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if AuthenticateDeliverymanUseCase throws a DeliverymanNotFoundWithProvidedUsernameError', async () => {
    const errorMock = new DeliverymanNotFoundWithProvidedUsernameError();

    jest
      .spyOn(authenticateDeliverymanUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeAuthenticateDeliverymanControllerRequestMock();

    const response = await authenticateDeliverymanController.handle(
      requestMock
    );

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return unprocessable entity (422) if AuthenticateDeliverymanUseCase throws a WrongPasswordError', async () => {
    const errorMock = new WrongPasswordError();

    jest
      .spyOn(authenticateDeliverymanUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeAuthenticateDeliverymanControllerRequestMock();

    const response = await authenticateDeliverymanController.handle(
      requestMock
    );

    expect(response).toEqual(unprocessableEntity(errorMock));
  });

  it('should return ok (200) if AuthenticateDeliverymanUseCase returns the Authentication', async () => {
    const output = makeAuthenticateDeliverymanUseCaseOutputMock();

    jest
      .spyOn(authenticateDeliverymanUseCaseSpy, 'execute')
      .mockResolvedValueOnce(output);

    const requestMock = makeAuthenticateDeliverymanControllerRequestMock();

    const response = await authenticateDeliverymanController.handle(
      requestMock
    );

    expect(response).toEqual(ok(output));
  });
});
