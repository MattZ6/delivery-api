import { StartDeliveryUseCase } from '@application/usecases/delivery/Start';

import { makeDeliveriesRepository } from '@main/factories/repositories/Delivery';
import { makeDeliverymansRepository } from '@main/factories/repositories/Deliveryman';

export function makeStartDeliveryUseCase() {
  const deliveriesRepository = makeDeliveriesRepository();
  const deliverymansRepository = makeDeliverymansRepository();

  return new StartDeliveryUseCase(
    deliveriesRepository,
    deliverymansRepository,
    deliveriesRepository
  );
}
