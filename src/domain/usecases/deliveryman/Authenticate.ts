import { Authentication } from '@domain/entities/Authentication';

interface IAuthenticateDeliverymanUseCase {
  execute(
    data: IAuthenticateDeliverymanUseCase.Input
  ): Promise<IAuthenticateDeliverymanUseCase.Output>;
}

namespace IAuthenticateDeliverymanUseCase {
  export type Input = {
    username: string;
    password: string;
  };

  export type Output = Authentication;
}

export { IAuthenticateDeliverymanUseCase };
