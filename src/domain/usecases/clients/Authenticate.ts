import { Authentication } from '@domain/entities/Authentication';

interface IAuthenticateClientUseCase {
  execute(data: IAuthenticateClientUseCase.Input): Promise<IAuthenticateClientUseCase.Output>;
}

namespace IAuthenticateClientUseCase {
  export type Input = {
    username: string;
    password: string;
  }

  export type Output = Authentication;
}

export { IAuthenticateClientUseCase };
