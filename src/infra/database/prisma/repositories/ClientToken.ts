import {
  ICreateClientTokenRepository,
  IDeleteClientTokenByIdRepository,
  IFindClientTokenByTokenRepository,
} from '@application/protocols/repositories/client';

import { prisma } from '..';

export class PostgresClientTokensRepository
  implements
    ICreateClientTokenRepository,
    IDeleteClientTokenByIdRepository,
    IFindClientTokenByTokenRepository
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

  async deleteById(
    data: IDeleteClientTokenByIdRepository.Input
  ): Promise<IDeleteClientTokenByIdRepository.Output> {
    const { id } = data;

    await prisma.clientToken.delete({
      where: { id },
    });
  }

  async findByToken(
    data: IFindClientTokenByTokenRepository.Input
  ): Promise<IFindClientTokenByTokenRepository.Output> {
    const { token } = data;

    const clientToken = await prisma.clientToken.findFirst({
      where: {
        token: { equals: token },
      },
    });

    return clientToken;
  }
}
