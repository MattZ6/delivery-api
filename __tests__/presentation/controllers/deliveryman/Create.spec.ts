import { DeliverymanAlreadyExistsWithProvidedUsernameError } from '@domain/errors';

import { CreateDeliverymanController } from '@presentation/controllers/deliveryman/Create';
import { badRequest, conflict, created } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  CreateDeliverymanUseCaseSpy,
  makeCreateDeliverymanControllerRequestMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let createDeliverymanUseCaseSpy: CreateDeliverymanUseCaseSpy;

let createDeliverymanController: CreateDeliverymanController;

describe('CreateDeliverymanController', () => {
  validationSpy = new ValidationSpy();
  createDeliverymanUseCaseSpy = new CreateDeliverymanUseCaseSpy();

  createDeliverymanController = new CreateDeliverymanController(
    validationSpy,
    createDeliverymanUseCaseSpy
  );

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const requestMock = makeCreateDeliverymanControllerRequestMock();

    await createDeliverymanController.handle(requestMock);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(requestMock.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const requestMock = makeCreateDeliverymanControllerRequestMock();

    const promise = createDeliverymanController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const requestMock = makeCreateDeliverymanControllerRequestMock();

    const response = await createDeliverymanController.handle(requestMock);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call CreateDeliverymanUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createDeliverymanUseCaseSpy, 'execute');

    const requestMock = makeCreateDeliverymanControllerRequestMock();

    await createDeliverymanController.handle(requestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith(requestMock.body);
  });

  it('should throw if CreateDeliverymanUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createDeliverymanUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeCreateDeliverymanControllerRequestMock();

    const promise = createDeliverymanController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return conflict (409) if CreateDeliverymanUseCase throws a DeliverymanAlreadyExistsWithProvidedUsernameError', async () => {
    const errorMock = new DeliverymanAlreadyExistsWithProvidedUsernameError();

    jest
      .spyOn(createDeliverymanUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeCreateDeliverymanControllerRequestMock();

    const response = await createDeliverymanController.handle(requestMock);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return created (201) if CreateDeliverymanUseCase returns a Deliveryman', async () => {
    const requestMock = makeCreateDeliverymanControllerRequestMock();

    const response = await createDeliverymanController.handle(requestMock);

    expect(response).toEqual(created<void>());
  });
});
