import { faker } from '@faker-js/faker';

import { IRefreshClientAccessTokenUseCase } from '@domain/usecases/clients/RefreshAccessToken';

export function makeRefreshClientAccessTokenUseCaseRefreshTokenExpiresTimeInMillissecondsMock() {
  return faker.datatype.number({ min: 1 });
}

export function makeRefreshClientAccessTokenUseCaseInputMock(): IRefreshClientAccessTokenUseCase.Input {
  return {
    refresh_token: faker.datatype.uuid(),
  };
}
