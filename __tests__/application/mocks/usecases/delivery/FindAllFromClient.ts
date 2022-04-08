import { faker } from '@faker-js/faker';

import { IFindAllDeliveriesFromClientUseCase } from '@domain/usecases/delivery/FindAllFromClient';

export function makeFindAllDeliveriesFromClientUseCaseDefaultSortByMock(): IFindAllDeliveriesFromClientUseCase.SortBy {
  return faker.random.arrayElement<IFindAllDeliveriesFromClientUseCase.SortBy>([
    'created_at',
    'item_name',
  ]);
}

export function makeFindAllDeliveriesFromClientUseCaseDefaultOrderMock(): IFindAllDeliveriesFromClientUseCase.Order {
  return faker.random.arrayElement<IFindAllDeliveriesFromClientUseCase.Order>([
    'asc',
    'desc',
  ]);
}

export function makeFindAllDeliveriesFromClientUseCaseDefaultLimitMock(): IFindAllDeliveriesFromClientUseCase.Limit {
  return faker.datatype.number({ min: 1 });
}

export function makeFindAllDeliveriesFromClientUseCaseDefaultOffsetMock(): IFindAllDeliveriesFromClientUseCase.Offset {
  return faker.datatype.number({ min: 1 });
}

export function makeFindAllDeliveriesFromClientUseCaseInputMock(): IFindAllDeliveriesFromClientUseCase.Input {
  return {
    client_id: faker.datatype.uuid(),
    sort_by: makeFindAllDeliveriesFromClientUseCaseDefaultSortByMock(),
    order: makeFindAllDeliveriesFromClientUseCaseDefaultOrderMock(),
    limit: makeFindAllDeliveriesFromClientUseCaseDefaultLimitMock(),
    offset: makeFindAllDeliveriesFromClientUseCaseDefaultOffsetMock(),
  };
}
