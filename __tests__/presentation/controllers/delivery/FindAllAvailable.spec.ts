import { FindAllAvailableDeliveriesController } from '@presentation/controllers/delivery/FindAllAvailable';
import { badRequest, ok } from '@presentation/helpers/http';

import { makeErrorMock } from '../../../domain';
import {
  FindAllAvailableDeliveriesUseCaseSpy,
  makeFindAllAvailableDeliveriesControllerRequestMock,
  makeFindAllAvailableDeliveriesUseCaseOutputMock,
  makeValidationErrorMock,
  ValidationSpy,
} from '../../mocks';

let validationSpy: ValidationSpy;
let findAllAvailableDeliveriesUseCaseSpy: FindAllAvailableDeliveriesUseCaseSpy;

let findAllAvailableDeliveriesController: FindAllAvailableDeliveriesController;

describe('FindAllAvailableDeliveriesController', () => {
  validationSpy = new ValidationSpy();
  findAllAvailableDeliveriesUseCaseSpy =
    new FindAllAvailableDeliveriesUseCaseSpy();

  findAllAvailableDeliveriesController =
    new FindAllAvailableDeliveriesController(
      validationSpy,
      findAllAvailableDeliveriesUseCaseSpy
    );

  it('should call Validation once with correct values', async () => {
    const validateSpy = jest.spyOn(validationSpy, 'validate');

    const requestMock = makeFindAllAvailableDeliveriesControllerRequestMock();

    await findAllAvailableDeliveriesController.handle(requestMock);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(requestMock.query);
  });

  it('should throw if Validation throws', async () => {
    const errorMock = makeErrorMock();

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      throw errorMock;
    });

    const requestMock = makeFindAllAvailableDeliveriesControllerRequestMock();

    const promise = findAllAvailableDeliveriesController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return bad request (400) if Validation returns a ValidationError', async () => {
    const validationErrorMock = makeValidationErrorMock();

    jest
      .spyOn(validationSpy, 'validate')
      .mockReturnValueOnce(validationErrorMock);

    const requestMock = makeFindAllAvailableDeliveriesControllerRequestMock();

    const response = await findAllAvailableDeliveriesController.handle(
      requestMock
    );

    expect(response).toEqual(badRequest(validationErrorMock));
  });

  it('should call FindAllAvailableDeliveriesUseCase once with correct values', async () => {
    const executeSpy = jest.spyOn(
      findAllAvailableDeliveriesUseCaseSpy,
      'execute'
    );

    const requestMock = makeFindAllAvailableDeliveriesControllerRequestMock();

    await findAllAvailableDeliveriesController.handle(requestMock);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(executeSpy).toHaveBeenCalledWith({
      sort_by: requestMock.query.sort_by,
      order: requestMock.query.order,
      limit: requestMock.query.limit,
      offset: requestMock.query.offset,
    });
  });

  it('should throw if FindAllAvailableDeliveriesUseCase throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllAvailableDeliveriesUseCaseSpy, 'execute')
      .mockRejectedValueOnce(errorMock);

    const requestMock = makeFindAllAvailableDeliveriesControllerRequestMock();

    const promise = findAllAvailableDeliveriesController.handle(requestMock);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return ok (200) if FindAllAvailableDeliveriesUseCase returns a Delivery', async () => {
    const outputMock = makeFindAllAvailableDeliveriesUseCaseOutputMock();

    jest
      .spyOn(findAllAvailableDeliveriesUseCaseSpy, 'execute')
      .mockResolvedValueOnce(outputMock);

    const requestMock = makeFindAllAvailableDeliveriesControllerRequestMock();

    const response = await findAllAvailableDeliveriesController.handle(
      requestMock
    );

    expect(response).toEqual(ok(outputMock));
  });
});
