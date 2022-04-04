import {
  DeliveryAlreadyStartedError,
  DeliverymanNotFoundWithProvidedIdError,
  DeliveryNotFoundWithProvidedIdError,
} from '@domain/errors';
import { IStartDeliveryUseCase } from '@domain/usecases/delivery/Start';

import {
  IFindDeliveryByIdRepository,
  IUpdateDeliveryRepository,
} from '@application/protocols/repositories/delivery';
import { ICheckIfDeliverymanExistsByIdRepository } from '@application/protocols/repositories/deliveryman';

export class StartDeliveryUseCase implements IStartDeliveryUseCase {
  constructor(
    private readonly findDeliveryByIdRepository: IFindDeliveryByIdRepository,
    private readonly checkIfDeliverymanExistsByIdRepository: ICheckIfDeliverymanExistsByIdRepository,
    private readonly updateDeliveryRepository: IUpdateDeliveryRepository
  ) {}

  async execute(
    data: IStartDeliveryUseCase.Input
  ): Promise<IStartDeliveryUseCase.Output> {
    const { delivery_id, deliveryman_id } = data;

    const delivery = await this.findDeliveryByIdRepository.findById({
      id: delivery_id,
    });

    if (!delivery) {
      throw new DeliveryNotFoundWithProvidedIdError();
    }

    if (delivery.deliveryman_id) {
      throw new DeliveryAlreadyStartedError();
    }

    const deliverymanExists =
      await this.checkIfDeliverymanExistsByIdRepository.checkIfExistsById({
        id: deliveryman_id,
      });

    if (!deliverymanExists) {
      throw new DeliverymanNotFoundWithProvidedIdError();
    }

    const updatedDelivery = await this.updateDeliveryRepository.update({
      id: delivery.id,
      deliveryman_id,
    });

    return updatedDelivery;
  }
}
