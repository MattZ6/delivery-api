import { PostgresErrorsRepository } from '@infra/database/prisma/repositories';

export function makeErrorsRepository() {
  return new PostgresErrorsRepository();
}
