import { AuthenticateClientUseCase } from '@application/usecases/client/Authenticate';
import { authConfig } from '@main/config/env/auth';
import { makeCryptographyProvider } from '@main/factories/providers/cryptography/Cryptography';
import { makeHashProvider } from '@main/factories/providers/cryptography/Hash';
import { makeUuidProvider } from '@main/factories/providers/uui/Uuid';
import { makeClientsRepository } from '@main/factories/repositories/Client';
import { makeClientTokensRepository } from '@main/factories/repositories/ClientToken';

export function makeAuthenticateClientUseCase() {
  const clientsRepository = makeClientsRepository();
  const clientTokensRepository = makeClientTokensRepository();
  const hashProvider = makeHashProvider();
  const cryptographyProvider = makeCryptographyProvider();
  const uuidProvider = makeUuidProvider();

  return new AuthenticateClientUseCase(
    clientsRepository,
    hashProvider,
    cryptographyProvider,
    uuidProvider,
    authConfig.REFRESH_TOKEN_EXPIRES_IN_MILLISSECONDS,
    clientTokensRepository,
  );
}
