import { CreateDeliveryUseCase } from '@application/usecases/delivery/Create';

import { makeClientsRepository } from '@main/factories/repositories/Client';
import { makeDeliveriesRepository } from '@main/factories/repositories/Delivery';

export function makeCreateDeliveryUseCase() {
  const clientsRepository = makeClientsRepository();
  const deliveriesRepository = makeDeliveriesRepository();

  return new CreateDeliveryUseCase(clientsRepository, deliveriesRepository);
}
