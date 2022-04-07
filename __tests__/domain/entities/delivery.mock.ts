import { faker } from '@faker-js/faker';

import { Delivery } from '@domain/entities/Delivery';

export function makeDeliveryMock(): Delivery {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    client_id: faker.datatype.uuid(),
    item_name: faker.commerce.productName(),
    delivered_at: faker.date.soon(faker.datatype.number({ min: 1 }), date),
    deliveryman_id: faker.datatype.uuid(),
    created_at: date,
    updated_at: date,
  };
}
