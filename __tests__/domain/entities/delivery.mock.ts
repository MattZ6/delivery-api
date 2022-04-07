import { faker } from '@faker-js/faker';

import { Delivery } from '@domain/entities/Delivery';

export function makeDeliveryMock(): Delivery {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    client_id: faker.datatype.uuid(),
    item_name: faker.commerce.productName(),
    created_at: date,
    updated_at: date,
  };
}
