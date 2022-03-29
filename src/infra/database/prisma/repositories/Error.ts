import { ISaveErrorRepository } from '@application/protocols/repositories/error';
import { ErrorModel } from '@domain/models/Error';

import { prisma } from '..';

export class PostgresErrorsRepository implements ISaveErrorRepository {
  async save(data: ISaveErrorRepository.Input): Promise<ErrorModel> {
    const { stack, thrown_at, http_method, resource_uri } = data;

    return prisma.error.create({
      data: {
        stack,
        thrown_at,
        http_method,
        resource_uri,
      }
    });
  }
}

