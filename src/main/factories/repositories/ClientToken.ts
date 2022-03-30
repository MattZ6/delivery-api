import { PostgresClientTokensRepository } from '@infra/database/prisma/repositories/ClientToken';

export function makeClientTokensRepository() {
  return new PostgresClientTokensRepository();
}
