import { faker } from '@faker-js/faker';

import { RefreshClientAccessTokenController } from '@presentation/controllers/client/RefreshAccessToken';

export function makeRefreshClientAccessTokenControllerRequestMock(): RefreshClientAccessTokenController.Request {
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
