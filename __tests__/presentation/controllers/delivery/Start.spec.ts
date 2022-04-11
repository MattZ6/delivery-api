import {
  DeliveryAlreadyStartedError,
  DeliverymanNotFoundWithProvidedIdError,
  DeliveryNotFoundWithProvidedIdError,
} from '@domain/errors';

import { StartDeliveryController } from '@presentation/controllers/delivery/Start';
import {
  badRequest,
  conflict,
  noContent,
  notFound,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  makeStartDeliveryControllerRequestMock,
  makeValidationErrorMock,
  StartDeliveryUseCaseSpy,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let startDeliveryUseCaseSpy: StartDeliveryUseCaseSpy;

let startDeliveryController: StartDeliveryController;

describe('StartDeliveryController', () => {
  beforeEach(() => {
    validationSpy = new ValidationSpy();
    startDeliveryUseCaseSpy = new StartDeliveryUseCaseSpy();

    startDeliveryController = new StartDeliveryController(
      validationSpy,
      startDeliveryUseCaseSpy
    );
  });

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const requestMock = makeStartDeliveryControllerRequestMock();

    await startDeliveryController.handle(requestMock);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(requestMock.params);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const requestMock = makeStartDeliveryControllerRequestMock();

    const promise = startDeliveryController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const requestMock = makeStartDeliveryControllerRequestMock();

    const response = await startDeliveryController.handle(requestMock);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call StartDeliveryUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(startDeliveryUseCaseSpy, 'execute');

    const requestMock = makeStartDeliveryControllerRequestMock();

    await startDeliveryController.handle(requestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      delivery_id: requestMock.params.delivery_id,
      deliveryman_id: requestMock.deliveryman_id,
    });
  });

  it('should throw if StartDeliveryUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(startDeliveryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeStartDeliveryControllerRequestMock();

    const promise = startDeliveryController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if StartDeliveryUseCase throws a DeliveryNotFoundWithProvidedIdError', async () => {
    const errorMock = new DeliveryNotFoundWithProvidedIdError();

    jest
      .spyOn(startDeliveryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeStartDeliveryControllerRequestMock();

    const response = await startDeliveryController.handle(requestMock);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return conflict (409) if StartDeliveryUseCase throws a DeliveryAlreadyStartedError', async () => {
    const errorMock = new DeliveryAlreadyStartedError();

    jest
      .spyOn(startDeliveryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeStartDeliveryControllerRequestMock();

    const response = await startDeliveryController.handle(requestMock);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return not found (404) if StartDeliveryUseCase throws a DeliverymanNotFoundWithProvidedIdError', async () => {
    const errorMock = new DeliverymanNotFoundWithProvidedIdError();

    jest
      .spyOn(startDeliveryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeStartDeliveryControllerRequestMock();

    const response = await startDeliveryController.handle(requestMock);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return no content (204) on success', async () => {
    const requestMock = makeStartDeliveryControllerRequestMock();

    const response = await startDeliveryController.handle(requestMock);

    expect(response).toEqual(noContent());
  });
});
