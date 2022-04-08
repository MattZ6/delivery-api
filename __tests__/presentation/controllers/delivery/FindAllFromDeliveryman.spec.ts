import { DeliverymanNotFoundWithProvidedIdError } from '@domain/errors';

import { FindAllDeliveriesFromDeliverymanController } from '@presentation/controllers/delivery/FindAllFromDeliveryman';
import { badRequest, notFound, ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  FindAllDeliveriesFromDeliverymanUseCaseSpy,
  makeFindAllDeliveriesFromDeliverymanControllerRequestMock,
  makeFindAllDeliveriesFromDeliverymanUseCaseOutputMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let findAllDeliveriesFromDeliverymanUseCaseSpy: FindAllDeliveriesFromDeliverymanUseCaseSpy;

let findAllDeliveriesFromDeliverymanController: FindAllDeliveriesFromDeliverymanController;

describe('FindAllDeliveriesFromDeliverymanController', () => {
  validationSpy = new ValidationSpy();
  findAllDeliveriesFromDeliverymanUseCaseSpy =
    new FindAllDeliveriesFromDeliverymanUseCaseSpy();

  findAllDeliveriesFromDeliverymanController =
    new FindAllDeliveriesFromDeliverymanController(
      validationSpy,
      findAllDeliveriesFromDeliverymanUseCaseSpy
    );

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const requestMock =
      makeFindAllDeliveriesFromDeliverymanControllerRequestMock();

    await findAllDeliveriesFromDeliverymanController.handle(requestMock);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(requestMock.query);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const requestMock =
      makeFindAllDeliveriesFromDeliverymanControllerRequestMock();

    const promise =
      findAllDeliveriesFromDeliverymanController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const requestMock =
      makeFindAllDeliveriesFromDeliverymanControllerRequestMock();

    const response = await findAllDeliveriesFromDeliverymanController.handle(
      requestMock
    );

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call FindAllDeliveriesFromDeliverymanUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(
      findAllDeliveriesFromDeliverymanUseCaseSpy,
      'execute'
    );

    const requestMock =
      makeFindAllDeliveriesFromDeliverymanControllerRequestMock();

    await findAllDeliveriesFromDeliverymanController.handle(requestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      deliveryman_id: requestMock.deliveryman_id,
      sort_by: requestMock.query.sort_by,
      order: requestMock.query.order,
      limit: requestMock.query.limit,
      offset: requestMock.query.offset,
    });
  });

  it('should throw if FindAllDeliveriesFromDeliverymanUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllDeliveriesFromDeliverymanUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock =
      makeFindAllDeliveriesFromDeliverymanControllerRequestMock();

    const promise =
      findAllDeliveriesFromDeliverymanController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) FindAllDeliveriesFromDeliverymanUseCase throws a DeliverymanNotFoundWithProvidedIdError', async () => {
    const errorMock = new DeliverymanNotFoundWithProvidedIdError();

    jest
      .spyOn(findAllDeliveriesFromDeliverymanUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock =
      makeFindAllDeliveriesFromDeliverymanControllerRequestMock();

    const response = await findAllDeliveriesFromDeliverymanController.handle(
      requestMock
    );

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return ok (200) if FindAllDeliveriesFromDeliverymanUseCase returns a Delivery', async () => {
    const outputMock = makeFindAllDeliveriesFromDeliverymanUseCaseOutputMock();

    jest
      .spyOn(findAllDeliveriesFromDeliverymanUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const requestMock =
      makeFindAllDeliveriesFromDeliverymanControllerRequestMock();

    const response = await findAllDeliveriesFromDeliverymanController.handle(
      requestMock
    );

    expect(response).toEqual(ok(outputMock));
  });
});
