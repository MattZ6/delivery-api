import { faker } from '@faker-js/faker';

import { AuthenticateDeliverymanController } from '@presentation/controllers/deliveryman/Authenticate';

export function makeAuthenticateDeliverymanControllerRequestMock(): AuthenticateDeliverymanController.Request {
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
