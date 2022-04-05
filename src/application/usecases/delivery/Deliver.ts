import {
  DeliveryAlreadyFinishedError,
  DeliverymanNotFoundWithProvidedIdError,
  DeliveryNotFoundWithProvidedIdError,
  DeliveryNotStartedError,
  DeliveryStartedByAnotherDeliverymanError,
} from '@domain/errors';
import { IDeliverDeliveryUseCase } from '@domain/usecases/delivery/Deliver';

import {
  IFindDeliveryByIdRepository,
  IUpdateDeliveryRepository,
} from '@application/protocols/repositories/delivery';
import { ICheckIfDeliverymanExistsByIdRepository } from '@application/protocols/repositories/deliveryman';

export class DeliverDeliveryUseCase implements IDeliverDeliveryUseCase {
  constructor(
    private readonly findDeliveryByIdRepository: IFindDeliveryByIdRepository,
    private readonly checkIfDeliverymanExistsByIdRepository: ICheckIfDeliverymanExistsByIdRepository,
    private readonly updateDeliveryRepository: IUpdateDeliveryRepository
  ) {}

  async execute(
    data: IDeliverDeliveryUseCase.Input
  ): Promise<IDeliverDeliveryUseCase.Output> {
    const { delivery_id, deliveryman_id } = data;

    const delivery = await this.findDeliveryByIdRepository.findById({
      id: delivery_id,
    });

    if (!delivery) {
      throw new DeliveryNotFoundWithProvidedIdError();
    }

    if (!delivery.deliveryman_id) {
      throw new DeliveryNotStartedError();
    }

    const deliverymanExists =
      await this.checkIfDeliverymanExistsByIdRepository.checkIfExistsById({
        id: deliveryman_id,
      });

    if (!deliverymanExists) {
      throw new DeliverymanNotFoundWithProvidedIdError();
    }

    if (delivery.deliveryman_id !== deliveryman_id) {
      throw new DeliveryStartedByAnotherDeliverymanError();
    }

    if (delivery.delivered_at) {
      throw new DeliveryAlreadyFinishedError();
    }

    const deliveredAt = Date.now();

    const updatedDelivery = await this.updateDeliveryRepository.update({
      id: delivery_id,
      delivered_at: new Date(deliveredAt),
    });

    return updatedDelivery;
  }
}
