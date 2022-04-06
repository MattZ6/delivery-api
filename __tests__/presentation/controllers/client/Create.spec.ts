import { ClientAlreadyExistsWithProvidedUsernameError } from '@domain/errors';

import { CreateClientController } from '@presentation/controllers/client/Create';
import { badRequest, conflict, created } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  CreateClientUseCaseSpy,
  makeCreateClientControllerRequestMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let createClientUseCaseSpy: CreateClientUseCaseSpy;

let createClientController: CreateClientController;

describe('CreateClientController', () => {
  validationSpy = new ValidationSpy();
  createClientUseCaseSpy = new CreateClientUseCaseSpy();

  createClientController = new CreateClientController(
    validationSpy,
    createClientUseCaseSpy
  );

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const requestMock = makeCreateClientControllerRequestMock();

    await createClientController.handle(requestMock);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(requestMock.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const requestMock = makeCreateClientControllerRequestMock();

    const promise = createClientController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const requestMock = makeCreateClientControllerRequestMock();

    const response = await createClientController.handle(requestMock);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call CreateClientUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createClientUseCaseSpy, 'execute');

    const requestMock = makeCreateClientControllerRequestMock();

    await createClientController.handle(requestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith(requestMock.body);
  });

  it('should throw if CreateClientUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createClientUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeCreateClientControllerRequestMock();

    const promise = createClientController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return conflict (409) if CreateClientUseCase throws a ClientAlreadyExistsWithProvidedUsernameError', async () => {
    const errorMock = new ClientAlreadyExistsWithProvidedUsernameError();

    jest
      .spyOn(createClientUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeCreateClientControllerRequestMock();

    const response = await createClientController.handle(requestMock);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return created (201) if CreateClientUseCase returns a Client', async () => {
    const requestMock = makeCreateClientControllerRequestMock();

    const response = await createClientController.handle(requestMock);

    expect(response).toEqual(created<void>());
  });
});
