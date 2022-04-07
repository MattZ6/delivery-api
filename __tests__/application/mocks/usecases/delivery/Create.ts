import { faker } from '@faker-js/faker';

import { ICreateDeliveryUseCase } from '@domain/usecases/delivery/Create';

export function makeCreateDeliveryUseCaseInputMock(): ICreateDeliveryUseCase.Input {
  return {
    client_id: faker.datatype.uuid(),
    item_name: faker.commerce.productName(),
  };
}
