import { ICreateDeliveryRepository } from '@application/protocols/repositories/delivery';

import { prisma } from '..';

export class PostgresDeliveriesRepository implements ICreateDeliveryRepository {
  async create(
    data: ICreateDeliveryRepository.Input
  ): Promise<ICreateDeliveryRepository.Output> {
    const { client_id, item_name } = data;

    const delivery = await prisma.delivery.create({
      data: {
        item_name,
        client_id,
      },
    });

    return delivery;
  }
}
