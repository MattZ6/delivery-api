import { faker } from '@faker-js/faker';

import { IDeliverDeliveryUseCase } from '@domain/usecases/delivery/Deliver';

export function makeDeliverDeliveryUseCaseInputMock(): IDeliverDeliveryUseCase.Input {
  return {
    delivery_id: faker.datatype.uuid(),
    deliveryman_id: faker.datatype.uuid(),
  };
}
