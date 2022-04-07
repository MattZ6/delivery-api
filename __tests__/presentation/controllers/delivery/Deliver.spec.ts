import {
  DeliveryAlreadyFinishedError,
  DeliverymanNotFoundWithProvidedIdError,
  DeliveryNotFoundWithProvidedIdError,
  DeliveryNotStartedError,
  DeliveryStartedByAnotherDeliverymanError,
} from '@domain/errors';

import { DeliverDeliveryController } from '@presentation/controllers/delivery/Deliver';
import {
  badRequest,
  conflict,
  forbidden,
  noContent,
  notFound,
  unprocessableEntity,
} from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  DeliverDeliveryUseCaseSpy,
  makeDeliverDeliveryControllerRequestMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let deliverDeliveryUseCaseSpy: DeliverDeliveryUseCaseSpy;

let deliverDeliveryController: DeliverDeliveryController;

describe('DeliverDeliveryController', () => {
  validationSpy = new ValidationSpy();
  deliverDeliveryUseCaseSpy = new DeliverDeliveryUseCaseSpy();

  deliverDeliveryController = new DeliverDeliveryController(
    validationSpy,
    deliverDeliveryUseCaseSpy
  );

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const requestMock = makeDeliverDeliveryControllerRequestMock();

    await deliverDeliveryController.handle(requestMock);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(requestMock.params);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const requestMock = makeDeliverDeliveryControllerRequestMock();

    const promise = deliverDeliveryController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const requestMock = makeDeliverDeliveryControllerRequestMock();

    const response = await deliverDeliveryController.handle(requestMock);

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call DeliverDeliveryUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(deliverDeliveryUseCaseSpy, 'execute');

    const requestMock = makeDeliverDeliveryControllerRequestMock();

    await deliverDeliveryController.handle(requestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      delivery_id: requestMock.params.delivery_id,
      deliveryman_id: requestMock.deliveryman_id,
    });
  });

  it('should throw if DeliverDeliveryUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(deliverDeliveryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeDeliverDeliveryControllerRequestMock();

    const promise = deliverDeliveryController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) if DeliverDeliveryUseCase throws a DeliveryNotFoundWithProvidedIdError', async () => {
    const errorMock = new DeliveryNotFoundWithProvidedIdError();

    jest
      .spyOn(deliverDeliveryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeDeliverDeliveryControllerRequestMock();

    const response = await deliverDeliveryController.handle(requestMock);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return unprocessable entity (422) if DeliverDeliveryUseCase throws a DeliveryNotStartedError', async () => {
    const errorMock = new DeliveryNotStartedError();

    jest
      .spyOn(deliverDeliveryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeDeliverDeliveryControllerRequestMock();

    const response = await deliverDeliveryController.handle(requestMock);

    expect(response).toEqual(unprocessableEntity(errorMock));
  });

  it('should return not found (404) if DeliverDeliveryUseCase throws a DeliverymanNotFoundWithProvidedIdError', async () => {
    const errorMock = new DeliverymanNotFoundWithProvidedIdError();

    jest
      .spyOn(deliverDeliveryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeDeliverDeliveryControllerRequestMock();

    const response = await deliverDeliveryController.handle(requestMock);

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return forbidden (403) if DeliverDeliveryUseCase throws a DeliveryStartedByAnotherDeliverymanError', async () => {
    const errorMock = new DeliveryStartedByAnotherDeliverymanError();

    jest
      .spyOn(deliverDeliveryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeDeliverDeliveryControllerRequestMock();

    const response = await deliverDeliveryController.handle(requestMock);

    expect(response).toEqual(forbidden(errorMock));
  });

  it('should return conflict (409) if DeliverDeliveryUseCase throws a DeliveryAlreadyFinishedError', async () => {
    const errorMock = new DeliveryAlreadyFinishedError();

    jest
      .spyOn(deliverDeliveryUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeDeliverDeliveryControllerRequestMock();

    const response = await deliverDeliveryController.handle(requestMock);

    expect(response).toEqual(conflict(errorMock));
  });

  it('should return no content (204) if DeliverDeliveryUseCase on success', async () => {
    const requestMock = makeDeliverDeliveryControllerRequestMock();

    const response = await deliverDeliveryController.handle(requestMock);

    expect(response).toEqual(noContent());
  });
});
