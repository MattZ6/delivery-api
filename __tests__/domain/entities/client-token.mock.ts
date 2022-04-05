import { faker } from '@faker-js/faker';

import { ClientToken } from '@domain/entities/ClientToken';

export function makeClientTokenMock(): ClientToken {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    client_id: faker.datatype.uuid(),
    token: faker.datatype.uuid(),
    expires_in: faker.date.soon(faker.datatype.number({ min: 1 }), date),
    created_at: date,
    updated_at: date,
  };
}
