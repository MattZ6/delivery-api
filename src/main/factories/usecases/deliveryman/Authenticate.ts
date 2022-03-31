import { AuthenticateDeliverymanUseCase } from '@application/usecases/deliveryman/Authenticate';

import { authConfig } from '@main/config/env/auth';
import { makeCryptographyProvider } from '@main/factories/providers/cryptography/Cryptography';
import { makeHashProvider } from '@main/factories/providers/cryptography/Hash';
import { makeUuidProvider } from '@main/factories/providers/uui/Uuid';
import { makeDeliverymansRepository } from '@main/factories/repositories/Deliveryman';
import { makeDeliverymanTokensRepository } from '@main/factories/repositories/DeliverymanToken';

export function makeAuthenticateDeliverymanUseCase() {
  const deliverymansRepository = makeDeliverymansRepository();
  const deliverymanTokensRepository = makeDeliverymanTokensRepository();
  const hashProvider = makeHashProvider();
  const cryptographyProvider = makeCryptographyProvider();
  const uuidProvider = makeUuidProvider();

  return new AuthenticateDeliverymanUseCase(
    deliverymansRepository,
    hashProvider,
    cryptographyProvider,
    uuidProvider,
    authConfig.REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS,
    deliverymanTokensRepository
  );
}
