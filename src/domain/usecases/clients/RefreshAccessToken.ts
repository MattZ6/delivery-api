import { Authentication } from '@domain/entities/Authentication';

interface IRefreshClientAccessTokenUseCase {
  execute(
    data: IRefreshClientAccessTokenUseCase.Input
  ): Promise<IRefreshClientAccessTokenUseCase.Output>;
}

namespace IRefreshClientAccessTokenUseCase {
  export type Input = {
    refresh_token: string;
  };

  export type Output = Authentication;
}

export { IRefreshClientAccessTokenUseCase };
