import { RefreshClientAccessTokenUseCase } from '@application/usecases/client/RefreshAccessToken';

import { authConfig } from '@main/config/env/auth';
import { makeCryptographyProvider } from '@main/factories/providers/cryptography/Cryptography';
import { makeUuidProvider } from '@main/factories/providers/uui/Uuid';
import { makeClientTokensRepository } from '@main/factories/repositories/ClientToken';

export function makeRefreshClientAccessTokenUseCase() {
  const clientTokensRepository = makeClientTokensRepository();
  const cryptographyProvider = makeCryptographyProvider();
  const uuidProvider = makeUuidProvider();

  return new RefreshClientAccessTokenUseCase(
    clientTokensRepository,
    cryptographyProvider,
    uuidProvider,
    authConfig.REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS,
    clientTokensRepository,
    clientTokensRepository
  );
}
