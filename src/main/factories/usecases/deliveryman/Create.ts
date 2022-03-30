import { CreateDeliverymanUseCase } from '@application/usecases/deliveryman/Create';

import { makeHashProvider } from '@main/factories/providers/cryptography/Hash';
import { makeDeliverymansRepository } from '@main/factories/repositories/Deliveryman';

export function makeCreateDeliverymanUseCase() {
  const deliverymansRepository = makeDeliverymansRepository();

  const hashProvider = makeHashProvider();

  return new CreateDeliverymanUseCase(
    deliverymansRepository,
    hashProvider,
    deliverymansRepository
  );
}
