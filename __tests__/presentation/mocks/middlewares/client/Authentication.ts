import { faker } from '@faker-js/faker';

import { ClientAuthenticationMiddleware } from '@presentation/middlewares/client/Authentication';

export function makeClientAuthenticationMiddlewareRequestMock(): ClientAuthenticationMiddleware.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: {
      'x-access-token': faker.datatype.uuid(),
    },
    params: undefined,
    query: undefined,
    body: undefined,
  };
}
