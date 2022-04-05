import { ICreateClientTokenRepository } from '@application/protocols/repositories/client';

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
