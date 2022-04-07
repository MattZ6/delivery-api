import { ClientNotFoundWithProvidedIdError } from '@domain/errors';

import { CreateDeliveryController } from '@presentation/controllers/delivery/Create';
import { badRequest, created, notFound } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  CreateDeliveryUseCaseSpy,
  makeCreateDeliveryControllerRequestMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let createDeliveryUseCaseSpy: CreateDeliveryUseCaseSpy;

let createDeliveryController: CreateDeliveryController;

describe('CreateDeliveryController', () => {
  validationSpy = new ValidationSpy();
  createDeliveryUseCaseSpy = new CreateDeliveryUseCaseSpy();

  createDeliveryController = new CreateDeliveryController(
    validationSpy,
    createDeliveryUseCaseSpy
  );

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const requestMock = makeCreateDeliveryControllerRequestMock();

    await createDeliveryController.handle(requestMock);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(requestMock.body);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const requestMock = makeCreateDeliveryControllerRequestMock();

    const promise = createDeliveryController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const requestMock = makeCreateDeliveryControllerRequestMock();

    const response = await createDeliveryController.handle(requestMock);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call CreateDeliveryUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(createDeliveryUseCaseSpy, 'execute');

    const requestMock = makeCreateDeliveryControllerRequestMock();

    await createDeliveryController.handle(requestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      client_id: requestMock.client_id,
      item_name: requestMock.body.item_name,
    });
  });

  it('should throw if CreateDeliveryUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(createDeliveryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeCreateDeliveryControllerRequestMock();

    const promise = createDeliveryController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if CreateDeliveryUseCase throws a ClientNotFoundWithProvidedIdError', async () => {
    const errorMock = new ClientNotFoundWithProvidedIdError();

    jest
      .spyOn(createDeliveryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeCreateDeliveryControllerRequestMock();

    const response = await createDeliveryController.handle(requestMock);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return created (201) if CreateDeliveryUseCase returns a Delivery', async () => {
    const requestMock = makeCreateDeliveryControllerRequestMock();

    const response = await createDeliveryController.handle(requestMock);

    expect(response).toEqual(created<void>());
  });
});
