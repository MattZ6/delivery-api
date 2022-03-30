import { PostgresDeliverymansRepository } from '@infra/database/prisma/repositories/Deliveryman';

export function makeDeliverymansRepository() {
  return new PostgresDeliverymansRepository();
}
