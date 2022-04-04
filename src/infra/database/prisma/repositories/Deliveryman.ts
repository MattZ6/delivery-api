import {
  ICheckIfDeliverymanExistsByIdRepository,
  ICheckIfDeliverymanExistsByUsernameRepository,
  ICreateDeliverymanRepository,
  IFindDeliverymanByUsername,
} from '@application/protocols/repositories/deliveryman';

import { prisma } from '..';

export class PostgresDeliverymansRepository
  implements
    ICheckIfDeliverymanExistsByUsernameRepository,
    ICreateDeliverymanRepository,
    IFindDeliverymanByUsername,
    ICheckIfDeliverymanExistsByIdRepository
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

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password_hash,
      },
    });

    return deliveryman;
  }

  async findByUsername(
    data: IFindDeliverymanByUsername.Input
  ): Promise<IFindDeliverymanByUsername.Output> {
    const { username } = data;

    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    return deliveryman;
  }

  async checkIfExistsById(
    data: ICheckIfDeliverymanExistsByIdRepository.Input
  ): Promise<ICheckIfDeliverymanExistsByIdRepository.Output> {
    const { id } = data;

    const count = await prisma.deliveryman.count({
      where: { id },
    });

    return count > 0;
  }
}
