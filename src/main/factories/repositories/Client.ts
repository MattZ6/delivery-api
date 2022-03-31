import { PostgresClientsRepository } from '@infra/database/prisma/repositories';

export function makeClientsRepository() {
  return new PostgresClientsRepository();
}
