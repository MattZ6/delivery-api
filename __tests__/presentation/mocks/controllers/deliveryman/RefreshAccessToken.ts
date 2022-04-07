import { faker } from '@faker-js/faker';

import { RefreshDeliverymanAccessTokenController } from '@presentation/controllers/deliveryman/RefreshAccessToken';

export function makeRefreshDeliverymanAccessTokenControllerRequestMock(): RefreshDeliverymanAccessTokenController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    query: undefined,
    body: {
      refresh_token: faker.datatype.uuid(),
    },
  };
}
