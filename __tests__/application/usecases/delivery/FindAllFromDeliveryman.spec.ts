import { DeliverymanNotFoundWithProvidedIdError } from '@domain/errors';
import { IFindAllDeliveriesFromDeliverymanUseCase } from '@domain/usecases/delivery/FindAllFromDeliveryman';

import { FindAllDeliveriesFromDeliverymanUseCase } from '@application/usecases/delivery/FindAllFromDeliveryman';

import { makeDeliveryMock, makeErrorMock } from '../../../domain';
import {
  CheckIfDeliverymanExistsByIdRepositorySpy,
  FindAllDeliveriesFromDeliverymanRepositorySpy,
  makeFindAllAvailableDeliveriesUseCaseDefaultLimitMock,
  makeFindAllAvailableDeliveriesUseCaseDefaultOffsetMock,
  makeFindAllAvailableDeliveriesUseCaseDefaultOrderMock,
  makeFindAllAvailableDeliveriesUseCaseDefaultSortByMock,
  makeFindAllDeliveriesFromDeliverymanUseCaseInputMock,
} from '../../mocks';

let checkIfDeliverymanExistsByIdRepositorySpy: CheckIfDeliverymanExistsByIdRepositorySpy;
let findAllDeliveriesFromDeliverymanUseCaseDefaultSortBy: IFindAllDeliveriesFromDeliverymanUseCase.SortBy;
let findAllDeliveriesFromDeliverymanUseCaseDefaultOrder: IFindAllDeliveriesFromDeliverymanUseCase.Order;
let findAllDeliveriesFromDeliverymanUseCaseDefaultLimit: IFindAllDeliveriesFromDeliverymanUseCase.Limit;
let findAllDeliveriesFromDeliverymanUseCaseDefaultOffset: IFindAllDeliveriesFromDeliverymanUseCase.Offset;
let findAllDeliveriesFromDeliverymanRepositorySpy: FindAllDeliveriesFromDeliverymanRepositorySpy;

let findAllDeliveriesFromDeliverymanUseCase: FindAllDeliveriesFromDeliverymanUseCase;

describe('FindAllDeliveriesFromDeliverymanUseCase', () => {
  beforeEach(() => {
    checkIfDeliverymanExistsByIdRepositorySpy =
      new CheckIfDeliverymanExistsByIdRepositorySpy();
    findAllDeliveriesFromDeliverymanUseCaseDefaultSortBy =
      makeFindAllAvailableDeliveriesUseCaseDefaultSortByMock();
    findAllDeliveriesFromDeliverymanUseCaseDefaultOrder =
      makeFindAllAvailableDeliveriesUseCaseDefaultOrderMock();
    findAllDeliveriesFromDeliverymanUseCaseDefaultLimit =
      makeFindAllAvailableDeliveriesUseCaseDefaultLimitMock();
    findAllDeliveriesFromDeliverymanUseCaseDefaultOffset =
      makeFindAllAvailableDeliveriesUseCaseDefaultOffsetMock();
    findAllDeliveriesFromDeliverymanRepositorySpy =
      new FindAllDeliveriesFromDeliverymanRepositorySpy();

    findAllDeliveriesFromDeliverymanUseCase =
      new FindAllDeliveriesFromDeliverymanUseCase(
        checkIfDeliverymanExistsByIdRepositorySpy,
        findAllDeliveriesFromDeliverymanUseCaseDefaultSortBy,
        findAllDeliveriesFromDeliverymanUseCaseDefaultOrder,
        findAllDeliveriesFromDeliverymanUseCaseDefaultLimit,
        findAllDeliveriesFromDeliverymanUseCaseDefaultOffset,
        findAllDeliveriesFromDeliverymanRepositorySpy
      );
  });

  it('should call CheckIfDeliverymanExistsByIdRepository once with correct values', async () => {
    const checkIfExistsByIdSpy = jest.spyOn(
      checkIfDeliverymanExistsByIdRepositorySpy,
      'checkIfExistsById'
    );

    const input = makeFindAllDeliveriesFromDeliverymanUseCaseInputMock();

    await findAllDeliveriesFromDeliverymanUseCase.execute(input);

    expect(checkIfExistsByIdSpy).toHaveBeenCalledTimes(1);
    expect(checkIfExistsByIdSpy).toHaveBeenCalledWith({
      id: input.deliveryman_id,
    });
  });

  it('should throw if CheckIfDeliverymanExistsByIdRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(checkIfDeliverymanExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockRejectedValueOnce(errorMock);

    const input = makeFindAllDeliveriesFromDeliverymanUseCaseInputMock();

    const promise = findAllDeliveriesFromDeliverymanUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should throw DeliverymanNotFoundWithProvidedIdError if CheckIfDeliverymanExistsByIdRepository returns false', async () => {
    jest
      .spyOn(checkIfDeliverymanExistsByIdRepositorySpy, 'checkIfExistsById')
      .mockResolvedValueOnce(false);

    const input = makeFindAllDeliveriesFromDeliverymanUseCaseInputMock();

    const promise = findAllDeliveriesFromDeliverymanUseCase.execute(input);

    await expect(promise).rejects.toBeInstanceOf(
      DeliverymanNotFoundWithProvidedIdError
    );
  });

  it('should call FindAllDeliveriesFromDeliverymanRepository once with correct values', async () => {
    const findAllFromDeliverymanSpy = jest.spyOn(
      findAllDeliveriesFromDeliverymanRepositorySpy,
      'findAllFromDeliveryman'
    );

    const input = makeFindAllDeliveriesFromDeliverymanUseCaseInputMock();

    await findAllDeliveriesFromDeliverymanUseCase.execute(input);

    expect(findAllFromDeliverymanSpy).toHaveBeenCalledTimes(1);
    expect(findAllFromDeliverymanSpy).toHaveBeenCalledWith({
      deliveryman_id: input.deliveryman_id,
      sort_by: input.sort_by,
      order: input.order,
      take: input.limit,
      skip: input.offset,
    });
  });

  it('should call FindAllDeliveriesFromDeliverymanRepository with default values if no input', async () => {
    const findAllFromDeliverymanSpy = jest.spyOn(
      findAllDeliveriesFromDeliverymanRepositorySpy,
      'findAllFromDeliveryman'
    );

    const input = makeFindAllDeliveriesFromDeliverymanUseCaseInputMock();

    await findAllDeliveriesFromDeliverymanUseCase.execute({
      deliveryman_id: input.deliveryman_id,
    });

    expect(findAllFromDeliverymanSpy).toHaveBeenCalledTimes(1);
    expect(findAllFromDeliverymanSpy).toHaveBeenCalledWith({
      deliveryman_id: input.deliveryman_id,
      sort_by: findAllDeliveriesFromDeliverymanUseCaseDefaultSortBy,
      order: findAllDeliveriesFromDeliverymanUseCaseDefaultOrder,
      take: findAllDeliveriesFromDeliverymanUseCaseDefaultLimit,
      skip: findAllDeliveriesFromDeliverymanUseCaseDefaultOffset,
    });
  });

  it('should throw if FindAllDeliveriesFromDeliverymanRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(
        findAllDeliveriesFromDeliverymanRepositorySpy,
        'findAllFromDeliveryman'
      )
      .mockRejectedValueOnce(errorMock);

    const input = makeFindAllDeliveriesFromDeliverymanUseCaseInputMock();

    const promise = findAllDeliveriesFromDeliverymanUseCase.execute(input);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return available deliveries on success', async () => {
    const deliveriesMock = [
      makeDeliveryMock(),
      makeDeliveryMock(),
      makeDeliveryMock(),
      makeDeliveryMock(),
    ];

    jest
      .spyOn(
        findAllDeliveriesFromDeliverymanRepositorySpy,
        'findAllFromDeliveryman'
      )
      .mockResolvedValueOnce(deliveriesMock);

    const input = makeFindAllDeliveriesFromDeliverymanUseCaseInputMock();

    const output = await findAllDeliveriesFromDeliverymanUseCase.execute(input);

    expect(output).toEqual(deliveriesMock);
  });
});
