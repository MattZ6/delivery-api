import { ClientNotFoundWithProvidedIdError } from '@domain/errors';

import { FindAllDeliveriesFromClientController } from '@presentation/controllers/delivery/FindAllFromClient';
import { badRequest, notFound, ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  FindAllDeliveriesFromClientUseCaseSpy,
  makeFindAllDeliveriesFromClientControllerRequestMock,
  makeFindAllDeliveriesFromClientUseCaseOutputMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let findAllDeliveriesFromClientUseCaseSpy: FindAllDeliveriesFromClientUseCaseSpy;

let findAllDeliveriesFromClientController: FindAllDeliveriesFromClientController;

describe('FindAllDeliveriesFromClientController', () => {
  validationSpy = new ValidationSpy();
  findAllDeliveriesFromClientUseCaseSpy =
    new FindAllDeliveriesFromClientUseCaseSpy();

  findAllDeliveriesFromClientController =
    new FindAllDeliveriesFromClientController(
      validationSpy,
      findAllDeliveriesFromClientUseCaseSpy
    );

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const requestMock = makeFindAllDeliveriesFromClientControllerRequestMock();

    await findAllDeliveriesFromClientController.handle(requestMock);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(requestMock.query);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const requestMock = makeFindAllDeliveriesFromClientControllerRequestMock();

    const promise = findAllDeliveriesFromClientController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const requestMock = makeFindAllDeliveriesFromClientControllerRequestMock();

    const response = await findAllDeliveriesFromClientController.handle(
      requestMock
    );

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call FindAllDeliveriesFromClientUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(
      findAllDeliveriesFromClientUseCaseSpy,
      'execute'
    );

    const requestMock = makeFindAllDeliveriesFromClientControllerRequestMock();

    await findAllDeliveriesFromClientController.handle(requestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      client_id: requestMock.client_id,
      sort_by: requestMock.query.sort_by,
      order: requestMock.query.order,
      limit: requestMock.query.limit,
      offset: requestMock.query.offset,
    });
  });

  it('should throw if FindAllDeliveriesFromClientUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllDeliveriesFromClientUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeFindAllDeliveriesFromClientControllerRequestMock();

    const promise = findAllDeliveriesFromClientController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return not found (404) FindAllDeliveriesFromClientUseCase throws a ClientNotFoundWithProvidedIdError', async () => {
    const errorMock = new ClientNotFoundWithProvidedIdError();

    jest
      .spyOn(findAllDeliveriesFromClientUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeFindAllDeliveriesFromClientControllerRequestMock();

    const response = await findAllDeliveriesFromClientController.handle(
      requestMock
    );

    expect(response).toEqual(notFound(errorMock));
  });

  it('should return ok (200) if FindAllDeliveriesFromClientUseCase returns a Delivery', async () => {
    const outputMock = makeFindAllDeliveriesFromClientUseCaseOutputMock();

    jest
      .spyOn(findAllDeliveriesFromClientUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const requestMock = makeFindAllDeliveriesFromClientControllerRequestMock();

    const response = await findAllDeliveriesFromClientController.handle(
      requestMock
    );

    expect(response).toEqual(ok(outputMock));
  });
});
