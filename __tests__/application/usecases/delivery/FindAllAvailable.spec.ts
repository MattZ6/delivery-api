import { IFindAllAvailableDeliveriesUseCase } from '@domain/usecases/delivery/FindAllAvailable';

import { FindAllAvailableDeliveriesUseCase } from '@application/usecases/delivery/FindAllAvailable';

import { makeDeliveryMock, makeErrorMock } from '../../../domain';
import {
  FindAllAvailableDeliveriesRepositorySpy,
  makeFindAllAvailableDeliveriesUseCaseDefaultLimitMock,
  makeFindAllAvailableDeliveriesUseCaseDefaultOffsetMock,
  makeFindAllAvailableDeliveriesUseCaseDefaultOrderMock,
  makeFindAllAvailableDeliveriesUseCaseDefaultSortByMock,
  makeFindAllAvailableDeliveriesUseCaseInputMock,
} from '../../mocks';

let findAllAvailableDeliveriesUseCaseDefaultSortBy: IFindAllAvailableDeliveriesUseCase.SortBy;
let findAllAvailableDeliveriesUseCaseDefaultOrder: IFindAllAvailableDeliveriesUseCase.Order;
let findAllAvailableDeliveriesUseCaseDefaultLimit: IFindAllAvailableDeliveriesUseCase.Limit;
let findAllAvailableDeliveriesUseCaseDefaultOffset: IFindAllAvailableDeliveriesUseCase.Offset;
let findAllAvailableDeliveriesRepositorySpy: FindAllAvailableDeliveriesRepositorySpy;

let findAllAvailableDeliveriesUseCase: FindAllAvailableDeliveriesUseCase;

describe('FindAllAvailableDeliveriesUseCase', () => {
  beforeEach(() => {
    findAllAvailableDeliveriesUseCaseDefaultSortBy =
      makeFindAllAvailableDeliveriesUseCaseDefaultSortByMock();
    findAllAvailableDeliveriesUseCaseDefaultOrder =
      makeFindAllAvailableDeliveriesUseCaseDefaultOrderMock();
    findAllAvailableDeliveriesUseCaseDefaultLimit =
      makeFindAllAvailableDeliveriesUseCaseDefaultLimitMock();
    findAllAvailableDeliveriesUseCaseDefaultOffset =
      makeFindAllAvailableDeliveriesUseCaseDefaultOffsetMock();
    findAllAvailableDeliveriesRepositorySpy =
      new FindAllAvailableDeliveriesRepositorySpy();

    findAllAvailableDeliveriesUseCase = new FindAllAvailableDeliveriesUseCase(
      findAllAvailableDeliveriesUseCaseDefaultSortBy,
      findAllAvailableDeliveriesUseCaseDefaultOrder,
      findAllAvailableDeliveriesUseCaseDefaultLimit,
      findAllAvailableDeliveriesUseCaseDefaultOffset,
      findAllAvailableDeliveriesRepositorySpy
    );
  });

  it('should call FindAllAvailableDeliveriesRepository once with correct values', async () => {
    const findAllAvailableSpy = jest.spyOn(
      findAllAvailableDeliveriesRepositorySpy,
      'findAllAvailable'
    );

    const input = makeFindAllAvailableDeliveriesUseCaseInputMock();

    await findAllAvailableDeliveriesUseCase.execute(input);

    expect(findAllAvailableSpy).toHaveBeenCalledTimes(1);
    expect(findAllAvailableSpy).toHaveBeenCalledWith({
      sort_by: input.sort_by,
      order: input.order,
      take: input.limit,
      skip: input.offset,
    });
  });

  it('should call FindAllAvailableDeliveriesRepository with default values if no input', async () => {
    const findAllAvailableSpy = jest.spyOn(
      findAllAvailableDeliveriesRepositorySpy,
      'findAllAvailable'
    );

    await findAllAvailableDeliveriesUseCase.execute({});

    expect(findAllAvailableSpy).toHaveBeenCalledTimes(1);
    expect(findAllAvailableSpy).toHaveBeenCalledWith({
      sort_by: findAllAvailableDeliveriesUseCaseDefaultSortBy,
      order: findAllAvailableDeliveriesUseCaseDefaultOrder,
      take: findAllAvailableDeliveriesUseCaseDefaultLimit,
      skip: findAllAvailableDeliveriesUseCaseDefaultOffset,
    });
  });

  it('should throw if FindAllAvailableDeliveriesRepository throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(findAllAvailableDeliveriesRepositorySpy, 'findAllAvailable')
      .mockRejectedValueOnce(errorMock);

    const input = makeFindAllAvailableDeliveriesUseCaseInputMock();

    const promise = findAllAvailableDeliveriesUseCase.execute(input);

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
      .spyOn(findAllAvailableDeliveriesRepositorySpy, 'findAllAvailable')
      .mockResolvedValueOnce(deliveriesMock);

    const input = makeFindAllAvailableDeliveriesUseCaseInputMock();

    const output = await findAllAvailableDeliveriesUseCase.execute(input);

    expect(output).toEqual(deliveriesMock);
  });
});
