import { faker } from '@faker-js/faker';

import { CreateDeliveryController } from '@presentation/controllers/delivery/Create';

export function makeCreateDeliveryControllerRequestMock(): CreateDeliveryController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    query: undefined,
    body: {
      item_name: faker.commerce.productName(),
    },
    client_id: faker.datatype.uuid(),
  };
}
