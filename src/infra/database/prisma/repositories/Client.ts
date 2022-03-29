import { ICheckIfClientExistsByUsernameRepository, ICreateClientRepository } from '@application/protocols/repositories/client';

import { prisma } from '..';

export class PostgresClientsRepository implements ICheckIfClientExistsByUsernameRepository,
  ICreateClientRepository {
    async checkIfExistsByUsername(data: ICheckIfClientExistsByUsernameRepository.Input): Promise<ICheckIfClientExistsByUsernameRepository.Output> {
      const { username } = data;

      const count = await prisma.client.count({
        where: {
          username: {
            equals: username,
            mode: 'insensitive',
          }
        }
      });

      return count > 0;
    }

    async create(data: ICreateClientRepository.Input): Promise<ICreateClientRepository.Output> {
      const { username, password_hash } = data;

      const client = await prisma.client.create({
        data: {
          username,
          password_hash,
        }
      });

      return client;
    }
  }