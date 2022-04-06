import { faker } from '@faker-js/faker';

import { CreateClientController } from '@presentation/controllers/client/Create';

export function makeCreateClientControllerRequestMock(): CreateClientController.Request {
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
