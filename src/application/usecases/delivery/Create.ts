import { ClientNotFoundWithProvidedIdError } from '@domain/errors';
import { ICreateDeliveryUseCase } from '@domain/usecases/delivery/Create';

import { ICheckIfClientExistsByIdRepository } from '@application/protocols/repositories/client';
import { ICreateDeliveryRepository } from '@application/protocols/repositories/delivery';

export class CreateDeliveryUseCase implements ICreateDeliveryUseCase {
  constructor(
    private readonly checkIfClientExistsByIdRepository: ICheckIfClientExistsByIdRepository,
    private readonly createDeliveryRepository: ICreateDeliveryRepository
  ) {}

  async execute(
    data: ICreateDeliveryUseCase.Input
  ): Promise<ICreateDeliveryUseCase.Output> {
    const { client_id, item_name } = data;

    const exists =
      await this.checkIfClientExistsByIdRepository.checkIfExistsById({
        id: client_id,
      });

    if (!exists) {
      throw new ClientNotFoundWithProvidedIdError();
    }

    const delivery = await this.createDeliveryRepository.create({
      client_id,
      item_name,
    });

    return delivery;
  }
}
