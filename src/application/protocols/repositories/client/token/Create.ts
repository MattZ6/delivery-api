import { ClientToken } from '@domain/entities/ClientToken';

interface ICreateClientTokenRepository {
  create(
    data: ICreateClientTokenRepository.Input
  ): Promise<ICreateClientTokenRepository.Output>;
}

namespace ICreateClientTokenRepository {
  export type Input = {
    token: string;
    client_id: string;
    expires_in: Date;
  };

  export type Output = ClientToken;
}

export { ICreateClientTokenRepository };
