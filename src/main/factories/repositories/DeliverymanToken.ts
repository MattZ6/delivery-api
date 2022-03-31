import { PostgresDeliverymanTokensRepository } from '@infra/database/prisma/repositories';

export function makeDeliverymanTokensRepository() {
  return new PostgresDeliverymanTokensRepository();
}
