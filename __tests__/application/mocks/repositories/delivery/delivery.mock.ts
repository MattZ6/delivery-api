import { ICreateDeliveryRepository } from '@application/protocols/repositories/delivery';

import { makeDeliveryMock } from '../../../../domain';

export class CreateDeliveryRepositorySpy implements ICreateDeliveryRepository {
  async create(
    data: ICreateDeliveryRepository.Input
  ): Promise<ICreateDeliveryRepository.Output> {
    const { client_id, item_name } = data;

    const deliveryMock = makeDeliveryMock();

    Object.assign(deliveryMock, { client_id, item_name });

    return deliveryMock;
  }
}
