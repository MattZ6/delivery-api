import { faker } from '@faker-js/faker';

import { Client } from '@domain/entities/Client';

export function makeClientMock(): Client {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    username: faker.internet.userName(),
    password_hash: faker.internet.password(),
    created_at: date,
    updated_at: date,
  };
}
