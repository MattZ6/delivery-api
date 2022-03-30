import { CreateClientUseCase } from '@application/usecases/client/Create';

import { makeHashProvider } from '@main/factories/providers/cryptography/Hash';
import { makeClientsRepository } from '@main/factories/repositories/Client';

export function makeCreateClientUseCase() {
  const clientsRepository = makeClientsRepository();

  const hashProvider = makeHashProvider();

  return new CreateClientUseCase(
    clientsRepository,
    hashProvider,
    clientsRepository
  );
}
