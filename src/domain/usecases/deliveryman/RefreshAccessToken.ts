import { Authentication } from '@domain/entities/Authentication';

interface IRefreshDeliverymanAccessTokenUseCase {
  execute(
    data: IRefreshDeliverymanAccessTokenUseCase.Input
  ): Promise<IRefreshDeliverymanAccessTokenUseCase.Output>;
}

namespace IRefreshDeliverymanAccessTokenUseCase {
  export type Input = {
    refresh_token: string;
  };

  export type Output = Authentication;
}

export { IRefreshDeliverymanAccessTokenUseCase };
