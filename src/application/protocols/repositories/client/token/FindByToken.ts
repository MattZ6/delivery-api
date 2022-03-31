import { ClientToken } from '@domain/entities/ClientToken';

interface IFindClientTokenByTokenRepository {
  findByToken(
    data: IFindClientTokenByTokenRepository.Input
  ): Promise<IFindClientTokenByTokenRepository.Output>;
}

namespace IFindClientTokenByTokenRepository {
  export type Input = {
    token: string;
  };

  export type Output = ClientToken | null;
}

export { IFindClientTokenByTokenRepository };
