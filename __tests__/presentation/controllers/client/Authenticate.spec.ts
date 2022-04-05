import {
  ClientNotFoundWithProvidedUsernameError,
  WrongPasswordError,
} from '@domain/errors';

import { AuthenticateClientController } from '@presentation/controllers/client/Authenticate';
import {
  badRequest,
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  AuthenticateClientUseCaseSpy,
  makeAuthenticateClientControllerRequestMock,
  makeAuthenticateClientUseCaseOutputMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let authenticateClientUseCaseSpy: AuthenticateClientUseCaseSpy;

let authenticateClientController: AuthenticateClientController;

describe('AuthenticateClientController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    authenticateClientUseCaseSpy = new AuthenticateClientUseCaseSpy();

    authenticateClientController = new AuthenticateClientController(
      validationSpy,
      authenticateClientUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const requestMock = makeAuthenticateClientControllerRequestMock();

    await authenticateClientController.handle(requestMock);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(requestMock.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const requestMock = makeAuthenticateClientControllerRequestMock();

    const promise = authenticateClientController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const requestMock = makeAuthenticateClientControllerRequestMock();

    const response = await authenticateClientController.handle(requestMock);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call AuthenticateClientUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(authenticateClientUseCaseSpy, 'execute');

    const requestMock = makeAuthenticateClientControllerRequestMock();

    await authenticateClientController.handle(requestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      username: requestMock.body.username,
      password: requestMock.body.password,
    });
  });

  it('should throw if AuthenticateClientUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(authenticateClientUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeAuthenticateClientControllerRequestMock();

    const promise = authenticateClientController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if AuthenticateClientUseCase throws a ClientNotFoundWithProvidedUsernameError', async () => {
    const errorMock = new ClientNotFoundWithProvidedUsernameError();

    jest
      .spyOn(authenticateClientUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeAuthenticateClientControllerRequestMock();

    const response = await authenticateClientController.handle(requestMock);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return unprocessable entity (422) if AuthenticateClientUseCase throws a WrongPasswordError', async () => {
    const errorMock = new WrongPasswordError();

    jest
      .spyOn(authenticateClientUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeAuthenticateClientControllerRequestMock();

    const response = await authenticateClientController.handle(requestMock);

    expect(response).toEqual(unprocessableEntity(errorMock));
  });

  it('should return ok (200) if AuthenticateClientUseCase returns the Authentication', async () => {
    const output = makeAuthenticateClientUseCaseOutputMock();

    jest
      .spyOn(authenticateClientUseCaseSpy, 'execute')
      .mockResolvedValueOnce(output);

    const requestMock = makeAuthenticateClientControllerRequestMock();

    const response = await authenticateClientController.handle(requestMock);

    expect(response).toEqual(ok(output));
  });
});
