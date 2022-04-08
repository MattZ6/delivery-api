import { faker } from '@faker-js/faker';

import { IFindAllAvailableDeliveriesUseCase } from '@domain/usecases/delivery/FindAllAvailable';

export function makeFindAllAvailableDeliveriesUseCaseDefaultSortByMock(): IFindAllAvailableDeliveriesUseCase.SortBy {
  return faker.random.arrayElement<IFindAllAvailableDeliveriesUseCase.SortBy>([
    'created_at',
    'item_name',
  ]);
}

export function makeFindAllAvailableDeliveriesUseCaseDefaultOrderMock(): IFindAllAvailableDeliveriesUseCase.Order {
  return faker.random.arrayElement<IFindAllAvailableDeliveriesUseCase.Order>([
    'asc',
    'desc',
  ]);
}

export function makeFindAllAvailableDeliveriesUseCaseDefaultLimitMock(): IFindAllAvailableDeliveriesUseCase.Limit {
  return faker.datatype.number({ min: 1 });
}

export function makeFindAllAvailableDeliveriesUseCaseDefaultOffsetMock(): IFindAllAvailableDeliveriesUseCase.Offset {
  return faker.datatype.number({ min: 1 });
}

export function makeFindAllAvailableDeliveriesUseCaseInputMock(): IFindAllAvailableDeliveriesUseCase.Input {
  return {
    sort_by: makeFindAllAvailableDeliveriesUseCaseDefaultSortByMock(),
    order: makeFindAllAvailableDeliveriesUseCaseDefaultOrderMock(),
    limit: makeFindAllAvailableDeliveriesUseCaseDefaultLimitMock(),
    offset: makeFindAllAvailableDeliveriesUseCaseDefaultOffsetMock(),
  };
}
