import { FindAllDeliveriesFromDeliverymanUseCase } from '@application/usecases/delivery/FindAllFromDeliveryman';

import { deliveryConfig } from '@main/config/env/delivery';
import { makeDeliveriesRepository } from '@main/factories/repositories/Delivery';
import { makeDeliverymansRepository } from '@main/factories/repositories/Deliveryman';

export function makeFindAllDeliveriesFromDeliverymanUseCase() {
  const deliverymansRepository = makeDeliverymansRepository();
  const deliveriesRepository = makeDeliveriesRepository();

  return new FindAllDeliveriesFromDeliverymanUseCase(
    deliverymansRepository,
    deliveryConfig.DEFAULT_SORT_BY,
    deliveryConfig.DEFAULT_ORDER,
    deliveryConfig.DEFAULT_LIMIT,
    deliveryConfig.DEFAULT_OFFSET,
    deliveriesRepository
  );
}
