import { faker } from '@faker-js/faker';

import { IFindAllDeliveriesFromDeliverymanUseCase } from '@domain/usecases/delivery/FindAllFromDeliveryman';

export function makeFindAllDeliveriesFromDeliverymanUseCaseDefaultSortByMock(): IFindAllDeliveriesFromDeliverymanUseCase.SortBy {
  return faker.random.arrayElement<IFindAllDeliveriesFromDeliverymanUseCase.SortBy>(
    ['created_at', 'item_name']
  );
}

export function makeFindAllDeliveriesFromDeliverymanUseCaseDefaultOrderMock(): IFindAllDeliveriesFromDeliverymanUseCase.Order {
  return faker.random.arrayElement<IFindAllDeliveriesFromDeliverymanUseCase.Order>(
    ['asc', 'desc']
  );
}

export function makeFindAllDeliveriesFromDeliverymanUseCaseDefaultLimitMock(): IFindAllDeliveriesFromDeliverymanUseCase.Limit {
  return faker.datatype.number({ min: 1 });
}

export function makeFindAllDeliveriesFromDeliverymanUseCaseDefaultOffsetMock(): IFindAllDeliveriesFromDeliverymanUseCase.Offset {
  return faker.datatype.number({ min: 1 });
}

export function makeFindAllDeliveriesFromDeliverymanUseCaseInputMock(): IFindAllDeliveriesFromDeliverymanUseCase.Input {
  return {
    deliveryman_id: faker.datatype.uuid(),
    sort_by: makeFindAllDeliveriesFromDeliverymanUseCaseDefaultSortByMock(),
    order: makeFindAllDeliveriesFromDeliverymanUseCaseDefaultOrderMock(),
    limit: makeFindAllDeliveriesFromDeliverymanUseCaseDefaultLimitMock(),
    offset: makeFindAllDeliveriesFromDeliverymanUseCaseDefaultOffsetMock(),
  };
}
