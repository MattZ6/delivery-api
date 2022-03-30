import { DeliverymanAlreadyExistsWithProvidedUsernameError } from '@domain/errors';
import { ICreateDeliverymanUseCase } from '@domain/usecases/deliveryman/Create';

import { IGenerateHashProvider } from '@application/protocols/providers/cryptography/hash';
import {
  ICheckIfDeliverymanExistsByUsernameRepository,
  ICreateDeliverymanRepository,
} from '@application/protocols/repositories/deliveryman';

export class CreateDeliverymanUseCase implements ICreateDeliverymanUseCase {
  constructor(
    private readonly checkIfDeliverymanExistsByUsernameRepository: ICheckIfDeliverymanExistsByUsernameRepository,
    private readonly generateHashProvider: IGenerateHashProvider,
    private readonly createDeliverymanRepository: ICreateDeliverymanRepository
  ) {}

  async execute(
    data: ICreateDeliverymanUseCase.Input
  ): Promise<ICreateDeliverymanUseCase.Output> {
    const { username, password } = data;

    const alreadyExists =
      await this.checkIfDeliverymanExistsByUsernameRepository.checkIfExistsByUsername(
        { username }
      );

    if (alreadyExists) {
      throw new DeliverymanAlreadyExistsWithProvidedUsernameError();
    }

    const passwordHash = await this.generateHashProvider.hash({
      value: password,
    });

    return this.createDeliverymanRepository.create({
      username,
      password_hash: passwordHash,
    });
  }
}
