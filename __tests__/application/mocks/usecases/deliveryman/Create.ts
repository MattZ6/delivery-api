import { faker } from '@faker-js/faker';

import { ICreateDeliverymanUseCase } from '@domain/usecases/deliveryman/Create';

export function makeCreateDeliverymanUseCaseInputMock(): ICreateDeliverymanUseCase.Input {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
}
