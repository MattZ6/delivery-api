import { faker } from '@faker-js/faker';

import { DeliverymanToken } from '@domain/entities/DeliverymanToken';

export function makeDeliverymanTokenMock(): DeliverymanToken {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    deliveryman_id: faker.datatype.uuid(),
    token: faker.datatype.uuid(),
    expires_in: faker.date.soon(faker.datatype.number({ min: 1 }), date),
    created_at: date,
    updated_at: date,
  };
}
