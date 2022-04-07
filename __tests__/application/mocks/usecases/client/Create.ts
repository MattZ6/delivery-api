import { faker } from '@faker-js/faker';

import { ICreateClientUseCase } from '@domain/usecases/client/Create';

export function makeCreateClientUseCaseInputMock(): ICreateClientUseCase.Input {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
}
