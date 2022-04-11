import { faker } from '@faker-js/faker';

import { DeliverymanAuthenticationMiddleware } from '@presentation/middlewares/deliveryman/Authentication';

export function makeDeliverymanAuthenticationMiddlewareRequestMock(): DeliverymanAuthenticationMiddleware.Request {
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
