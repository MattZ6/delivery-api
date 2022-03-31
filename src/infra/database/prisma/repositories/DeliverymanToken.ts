import { ICreateDeliverymanTokenRepository } from '@application/protocols/repositories/deliveryman';

import { prisma } from '..';

export class PostgresDeliverymanTokensRepository
  implements ICreateDeliverymanTokenRepository
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
}
