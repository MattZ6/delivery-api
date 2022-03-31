import { PostgresClientTokensRepository } from '@infra/database/prisma/repositories';

export function makeClientTokensRepository() {
  return new PostgresClientTokensRepository();
}
