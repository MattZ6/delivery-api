import { IRefreshClientAccessTokenUseCase } from '@domain/usecases/client/RefreshAccessToken';

import { makeAuthenticationMock } from '../../../../domain';

export function makeRefreshClientAccessTokenUseCaseOutputMock(): IRefreshClientAccessTokenUseCase.Output {
  return makeAuthenticationMock();
}

export class RefreshClientAccessTokenUseCaseSpy
  implements IRefreshClientAccessTokenUseCase
{
  async execute(
    _: IRefreshClientAccessTokenUseCase.Input
  ): Promise<IRefreshClientAccessTokenUseCase.Output> {
    return makeRefreshClientAccessTokenUseCaseOutputMock();
  }
}
