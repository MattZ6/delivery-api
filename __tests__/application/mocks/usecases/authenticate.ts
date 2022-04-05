import { faker } from '@faker-js/faker';

import { IAuthenticateClientUseCase } from '@domain/usecases/clients/Authenticate';

export function makeAuthenticateClientRefreshTokenExpiresTimeInMillissecondsMock() {
  return faker.datatype.number({ min: 1 });
}

export function makeAuthenticateClientUseCaseInputMock(): IAuthenticateClientUseCase.Input {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
}
