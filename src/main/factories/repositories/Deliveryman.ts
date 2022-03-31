import { PostgresDeliverymansRepository } from '@infra/database/prisma/repositories';

export function makeDeliverymansRepository() {
  return new PostgresDeliverymansRepository();
}
