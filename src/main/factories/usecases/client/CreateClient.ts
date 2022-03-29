import { CreateClientUseCase } from '@application/usecases/client/CreateClient';

import { makeClientsRepository } from '@main/factories/repositories/Client';
import { makeHashProvider } from '@main/factories/providers/cryptography/Hash';

export function makeCreateClientUseCase() {
  const clientsRepository = makeClientsRepository();

  const hashProvider = makeHashProvider();

  return new CreateClientUseCase(
    clientsRepository,
    hashProvider,
    clientsRepository,
  );
}
