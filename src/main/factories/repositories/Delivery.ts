import { PostgresDeliveriesRepository } from '@infra/database/prisma/repositories';

export function makeDeliveriesRepository() {
  return new PostgresDeliveriesRepository();
}
