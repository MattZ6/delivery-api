import { FindAllAvailableDeliveriesUseCase } from '@application/usecases/delivery/FindAllAvailable';

import { deliveryConfig } from '@main/config/env/delivery';
import { makeDeliveriesRepository } from '@main/factories/repositories/Delivery';

export function makeFindAllAvailableDeliveriesUseCase() {
  const deliveriesRepository = makeDeliveriesRepository();

  return new FindAllAvailableDeliveriesUseCase(
    deliveryConfig.DEFAULT_SORT_BY,
    deliveryConfig.DEFAULT_ORDER,
    deliveryConfig.DEFAULT_LIMIT,
    deliveryConfig.DEFAULT_OFFSET,
    deliveriesRepository
  );
}
