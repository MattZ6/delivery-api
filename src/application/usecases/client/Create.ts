import { ClientAlreadyExistsWithProvidedUsernameError } from '@domain/errors';
import { ICreateClientUseCase } from '@domain/usecases/client/Create';

import { IGenerateHashProvider } from '@application/protocols/providers/cryptography/hash';
import {
  ICheckIfClientExistsByUsernameRepository,
  ICreateClientRepository,
} from '@application/protocols/repositories/client';

export class CreateClientUseCase implements ICreateClientUseCase {
  constructor(
    private readonly checkIfClientExistsByUsernameRepository: ICheckIfClientExistsByUsernameRepository,
    private readonly generateHashProvider: IGenerateHashProvider,
    private readonly createClientRepository: ICreateClientRepository
  ) {}

  async execute(
    data: ICreateClientUseCase.Input
  ): Promise<ICreateClientUseCase.Output> {
    const { username, password } = data;

    const alreadyExists =
      await this.checkIfClientExistsByUsernameRepository.checkIfExistsByUsername(
        { username }
      );

    if (alreadyExists) {
      throw new ClientAlreadyExistsWithProvidedUsernameError();
    }

    const passwordHash = await this.generateHashProvider.hash({
      value: password,
    });

    const newClient = await this.createClientRepository.create({
      username,
      password_hash: passwordHash,
    });

    return newClient;
  }
}
