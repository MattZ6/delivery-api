import { faker } from '@faker-js/faker';

import { IRefreshDeliverymanAccessTokenUseCase } from '@domain/usecases/deliveryman/RefreshAccessToken';

export function makeRefreshDeliverymanAccessTokenUseCaseRefreshTokenExpiresTimeInMillissecondsMock() {
  return faker.datatype.number({ min: 1 });
}

export function makeRefreshDeliverymanAccessTokenUseCaseInputMock(): IRefreshDeliverymanAccessTokenUseCase.Input {
  return {
    refresh_token: faker.datatype.uuid(),
  };
}
