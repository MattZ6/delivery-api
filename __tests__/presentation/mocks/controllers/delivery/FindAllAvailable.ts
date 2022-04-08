import { faker } from '@faker-js/faker';

import { FindAllAvailableDeliveriesController } from '@presentation/controllers/delivery/FindAllAvailable';

export function makeFindAllAvailableDeliveriesControllerRequestMock(): FindAllAvailableDeliveriesController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    query: {
      sort_by: faker.random.arrayElement([
        'created_at',
        'item_name',
        undefined,
      ]),
      order: faker.random.arrayElement(['asc', 'desc', undefined]),
      limit: faker.datatype.number({ min: 1 }),
      offset: faker.datatype.number({ min: 1 }),
    },
    body: undefined,
    deliveryman_id: faker.datatype.uuid(),
  };
}
