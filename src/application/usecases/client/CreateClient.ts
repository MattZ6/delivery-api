import { ICreateClientUseCase } from '@domain/usecases/clients/CreateClient';
import { ClientAlreadyExistsWithProvidedUsernameError } from '@domain/errors/client';

import { ICheckIfClientExistsByUsernameRepository, ICreateClientRepository } from '@application/protocols/repositories/client';
import { IGenerateHashProvider } from '@application/protocols/providers/cryptography/hash';

export class CreateClientUseCase implements ICreateClientUseCase {
  constructor (
    private readonly checkIfClientExistsByUsernameRepository: ICheckIfClientExistsByUsernameRepository,
    private readonly generateHashProvider: IGenerateHashProvider,
    private readonly createClientRepository: ICreateClientRepository,
  ) { }

  async execute(data: ICreateClientUseCase.Input): Promise<ICreateClientUseCase.Output> {
    const { username, password } = data;

    const alreadyExists = await this.checkIfClientExistsByUsernameRepository
      .checkIfExistsByUsername({ username });

    if (alreadyExists) {
      throw new ClientAlreadyExistsWithProvidedUsernameError();
    }

    const passwordHash = await this.generateHashProvider.hash({ value: password });;

    return this.createClientRepository.create({
      username,
      password_hash: passwordHash,
    });
  }
}