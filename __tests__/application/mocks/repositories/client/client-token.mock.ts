import {
  ICreateClientTokenRepository,
  IDeleteClientTokenByIdRepository,
  IFindClientTokenByTokenRepository,
} from '@application/protocols/repositories/client';

import { makeClientTokenMock } from '../../../../domain';

export class CreateClientTokenRepositorySpy
  implements ICreateClientTokenRepository
{
  async create(
    data: ICreateClientTokenRepository.Input
  ): Promise<ICreateClientTokenRepository.Output> {
    const { client_id, expires_in, token } = data;

    const clientToken = makeClientTokenMock();

    Object.assign(clientToken, {
      client_id,
      expires_in,
      token,
    });

    return clientToken;
  }
}

export class FindClientTokenByTokenRepositorySpy
  implements IFindClientTokenByTokenRepository
{
  async findByToken(
    data: IFindClientTokenByTokenRepository.Input
  ): Promise<IFindClientTokenByTokenRepository.Output> {
    const { token } = data;

    const clientToken = makeClientTokenMock();

    Object.assign(clientToken, {
      token,
    });

    return clientToken;
  }
}

export class DeleteClientTokenByIdRepositorySpy
  implements IDeleteClientTokenByIdRepository
{
  async deleteById(
    _: IDeleteClientTokenByIdRepository.Input
  ): Promise<IDeleteClientTokenByIdRepository.Output> {
    // That's all
  }
}
