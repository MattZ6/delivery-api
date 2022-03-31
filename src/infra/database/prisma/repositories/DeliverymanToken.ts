import {
  ICreateDeliverymanTokenRepository,
  IDeleteDeliverymanTokenByIdRepository,
  IFindDeliverymanTokenByTokenRepository,
} from '@application/protocols/repositories/deliveryman';

import { prisma } from '..';

export class PostgresDeliverymanTokensRepository
  implements
    ICreateDeliverymanTokenRepository,
    IDeleteDeliverymanTokenByIdRepository,
    IFindDeliverymanTokenByTokenRepository
{
  async create(
    data: ICreateDeliverymanTokenRepository.Input
  ): Promise<ICreateDeliverymanTokenRepository.Output> {
    const { deliveryman_id, expires_in, token } = data;

    const deliverymanToken = await prisma.deliverymanToken.create({
      data: {
        deliveryman_id,
        expires_in,
        token,
      },
    });

    return deliverymanToken;
  }

  async deleteById(
    data: IDeleteDeliverymanTokenByIdRepository.Input
  ): Promise<IDeleteDeliverymanTokenByIdRepository.Output> {
    const { id } = data;

    await prisma.deliverymanToken.delete({
      where: { id },
    });
  }

  async findByToken(
    data: IFindDeliverymanTokenByTokenRepository.Input
  ): Promise<IFindDeliverymanTokenByTokenRepository.Output> {
    const { token } = data;

    const deliverymanToken = await prisma.deliverymanToken.findFirst({
      where: {
        token: { equals: token },
      },
    });

    return deliverymanToken;
  }
}
