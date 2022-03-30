import { ICreateClientTokenRepository } from '@application/protocols/repositories/client';

import { prisma } from '..';

export class PostgresClientTokensRepository
  implements ICreateClientTokenRepository
{
  async create(
    data: ICreateClientTokenRepository.Input
  ): Promise<ICreateClientTokenRepository.Output> {
    const { client_id, expires_in, token } = data;

    const clientToken = await prisma.clientToken.create({
      data: {
        client_id,
        expires_in,
        token,
      },
    });

    return clientToken;
  }
}
