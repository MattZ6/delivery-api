import { faker } from '@faker-js/faker';

import { IAuthenticateDeliverymanUseCase } from '@domain/usecases/deliveryman/Authenticate';

export function makeAuthenticateDeliverymanRefreshTokenExpiresTimeInMillissecondsMock() {
  return faker.datatype.number({ min: 1 });
}

export function makeAuthenticateDeliverymanUseCaseInputMock(): IAuthenticateDeliverymanUseCase.Input {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
}
