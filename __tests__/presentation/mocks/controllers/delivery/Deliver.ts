import { faker } from '@faker-js/faker';

import { DeliverDeliveryController } from '@presentation/controllers/delivery/Deliver';

export function makeDeliverDeliveryControllerRequestMock(): DeliverDeliveryController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: {
      delivery_id: faker.datatype.uuid(),
    },
    query: undefined,
    body: undefined,
    deliveryman_id: faker.datatype.uuid(),
  };
}
