import { PostgresClientsRepository } from '@infra/database/prisma/repositories/Client';

export function makeClientsRepository() {
  return new PostgresClientsRepository();
}
