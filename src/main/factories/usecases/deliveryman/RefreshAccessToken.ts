import { RefreshDeliverymanAccessTokenUseCase } from '@application/usecases/deliveryman/RefreshAccessToken';

import { authConfig } from '@main/config/env/auth';
import { makeCryptographyProvider } from '@main/factories/providers/cryptography/Cryptography';
import { makeUuidProvider } from '@main/factories/providers/uui/Uuid';
import { makeDeliverymanTokensRepository } from '@main/factories/repositories/DeliverymanToken';

export function makeRefreshDeliverymanAccessTokenUseCase() {
  const deliverymanTokensRepository = makeDeliverymanTokensRepository();
  const cryptographyProvider = makeCryptographyProvider();
  const uuidProvider = makeUuidProvider();

  return new RefreshDeliverymanAccessTokenUseCase(
    deliverymanTokensRepository,
    cryptographyProvider,
    uuidProvider,
    authConfig.REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS,
    deliverymanTokensRepository,
    deliverymanTokensRepository
  );
}
