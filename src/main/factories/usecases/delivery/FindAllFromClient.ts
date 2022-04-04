import { FindAllDeliveriesFromClientUseCase } from '@application/usecases/delivery/FinaAllFromClient';

import { deliveryConfig } from '@main/config/env/delivery';
import { makeClientsRepository } from '@main/factories/repositories/Client';
import { makeDeliveriesRepository } from '@main/factories/repositories/Delivery';

export function makeFindAllDeliveriesFromClientUseCase() {
  const clientsRepository = makeClientsRepository();
  const deliveriesRepository = makeDeliveriesRepository();

  return new FindAllDeliveriesFromClientUseCase(
    clientsRepository,
    deliveryConfig.DEFAULT_SORT_BY,
    deliveryConfig.DEFAULT_ORDER,
    deliveryConfig.DEFAULT_LIMIT,
    deliveryConfig.DEFAULT_OFFSET,
    deliveriesRepository
  );
}
