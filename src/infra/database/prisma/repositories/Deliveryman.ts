import {
  ICheckIfDeliverymanExistsByUsernameRepository,
  ICreateDeliverymanRepository,
} from '@application/protocols/repositories/deliveryman';

import { prisma } from '..';

export class PostgresDeliverymansRepository
  implements
    ICheckIfDeliverymanExistsByUsernameRepository,
    ICreateDeliverymanRepository
{
  async checkIfExistsByUsername(
    data: ICheckIfDeliverymanExistsByUsernameRepository.Input
  ): Promise<ICheckIfDeliverymanExistsByUsernameRepository.Output> {
    const { username } = data;

    const count = await prisma.deliveryman.count({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    return count > 0;
  }

  async create(
    data: ICreateDeliverymanRepository.Input
  ): Promise<ICreateDeliverymanRepository.Output> {
    const { username, password_hash } = data;

    const Deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password_hash,
      },
    });

    return Deliveryman;
  }
}
