import { faker } from '@faker-js/faker';

import { Deliveryman } from '@domain/entities/Deliveryman';

export function makeDeliverymanMock(): Deliveryman {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    password_hash: faker.internet.password(),
    created_at: date,
    updated_at: date,
  };
}
