import { faker } from '@faker-js/faker';

import { IStartDeliveryUseCase } from '@domain/usecases/delivery/Start';

export function makeStartDeliveryUseCaseInputMock(): IStartDeliveryUseCase.Input {
  return {
    delivery_id: faker.datatype.uuid(),
    deliveryman_id: faker.datatype.uuid(),
  };
}
