import {
  ICheckIfClientExistsByIdRepository,
  ICheckIfClientExistsByUsernameRepository,
  ICreateClientRepository,
  IFindClientByUsernameRepository,
} from '@application/protocols/repositories/client';

import { prisma } from '..';

export class PostgresClientsRepository
  implements
    ICheckIfClientExistsByUsernameRepository,
    ICreateClientRepository,
    IFindClientByUsernameRepository,
    ICheckIfClientExistsByIdRepository
{
  async checkIfExistsByUsername(
    data: ICheckIfClientExistsByUsernameRepository.Input
  ): Promise<ICheckIfClientExistsByUsernameRepository.Output> {
    const { username } = data;

    const count = await prisma.client.count({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    return count > 0;
  }

  async create(
    data: ICreateClientRepository.Input
  ): Promise<ICreateClientRepository.Output> {
    const { username, password_hash } = data;

    const client = await prisma.client.create({
      data: {
        username,
        password_hash,
      },
    });

    return client;
  }

  async findByUsername(
    data: IFindClientByUsernameRepository.Input
  ): Promise<IFindClientByUsernameRepository.Output> {
    const { username } = data;

    const client = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    return client;
  }

  async checkIfExistsById(
    data: ICheckIfClientExistsByIdRepository.Input
  ): Promise<ICheckIfClientExistsByIdRepository.Output> {
    const { id } = data;

    const count = await prisma.client.count({
      where: {
        id,
      },
    });

    return count > 0;
  }
}
