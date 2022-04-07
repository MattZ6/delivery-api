import { faker } from '@faker-js/faker';

import { CreateDeliverymanController } from '@presentation/controllers/deliveryman/Create';

export function makeCreateDeliverymanControllerRequestMock(): CreateDeliverymanController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    query: undefined,
    body: {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    },
  };
}
