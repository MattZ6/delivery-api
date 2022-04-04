import {
  ICreateDeliveryRepository,
  IFindAllAvailableDeliveriesRepository,
  IFindDeliveryByIdRepository,
  IUpdateDeliveryRepository,
} from '@application/protocols/repositories/delivery';

import { prisma } from '..';

export class PostgresDeliveriesRepository
  implements
    ICreateDeliveryRepository,
    IFindAllAvailableDeliveriesRepository,
    IFindDeliveryByIdRepository,
    IUpdateDeliveryRepository
{
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

  async findAllAvailable(
    data: IFindAllAvailableDeliveriesRepository.Input
  ): Promise<IFindAllAvailableDeliveriesRepository.Output> {
    const { sort_by, order, take, skip } = data;

    const deliveries = await prisma.delivery.findMany({
      where: {
        deliveryman_id: null,
      },
      orderBy: {
        [sort_by]: order,
      },
      take,
      skip,
    });

    return deliveries;
  }

  async findById(
    data: IFindDeliveryByIdRepository.Input
  ): Promise<IFindDeliveryByIdRepository.Output> {
    const { id } = data;

    const delivery = await prisma.delivery.findUnique({ where: { id } });

    return delivery;
  }

  async update(
    data: IUpdateDeliveryRepository.Input
  ): Promise<IUpdateDeliveryRepository.Output> {
    const { id, deliveryman_id, delivered_at } = data;

    const delivery = await prisma.delivery.update({
      where: {
        id,
      },
      data: {
        deliveryman_id,
        delivered_at,
      },
    });

    return delivery;
  }
}
