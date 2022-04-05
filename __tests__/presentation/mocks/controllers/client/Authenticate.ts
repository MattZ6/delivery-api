import { faker } from '@faker-js/faker';

import { AuthenticateClientController } from '@presentation/controllers/client/Authenticate';

export function makeAuthenticateClientControllerRequestMock(): AuthenticateClientController.Request {
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
