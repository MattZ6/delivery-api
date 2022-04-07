import { IRefreshDeliverymanAccessTokenUseCase } from '@domain/usecases/deliveryman/RefreshAccessToken';

import { makeAuthenticationMock } from '../../../../domain';

export function makeRefreshDeliverymanAccessTokenUseCaseOutputMock(): IRefreshDeliverymanAccessTokenUseCase.Output {
  return makeAuthenticationMock();
}

export class RefreshDeliverymanAccessTokenUseCaseSpy
  implements IRefreshDeliverymanAccessTokenUseCase
{
  async execute(
    _: IRefreshDeliverymanAccessTokenUseCase.Input
  ): Promise<IRefreshDeliverymanAccessTokenUseCase.Output> {
    return makeRefreshDeliverymanAccessTokenUseCaseOutputMock();
  }
}
