import { DeliverDeliveryUseCase } from '@application/usecases/delivery/Deliver';

import { makeDeliveriesRepository } from '@main/factories/repositories/Delivery';
import { makeDeliverymansRepository } from '@main/factories/repositories/Deliveryman';

export function makeDeliverDeliveryUseCase() {
  const deliveriesRepository = makeDeliveriesRepository();
  const deliverymansRepository = makeDeliverymansRepository();

  return new DeliverDeliveryUseCase(
    deliveriesRepository,
    deliverymansRepository,
    deliveriesRepository
  );
}
