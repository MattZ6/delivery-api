import {
  ICreateDeliverymanTokenRepository,
  IDeleteDeliverymanTokenByIdRepository,
  IFindDeliverymanTokenByTokenRepository,
} from '@application/protocols/repositories/deliveryman';

import { makeDeliverymanTokenMock } from '../../../../domain';

export class CreateDeliverymanTokenRepositorySpy
  implements ICreateDeliverymanTokenRepository
{
  async create(
    data: ICreateDeliverymanTokenRepository.Input
  ): Promise<ICreateDeliverymanTokenRepository.Output> {
    const { deliveryman_id, expires_in, token } = data;

    const deliverymanToken = makeDeliverymanTokenMock();

    Object.assign(deliverymanToken, {
      deliveryman_id,
      expires_in,
      token,
    });

    return deliverymanToken;
  }
}

export class FindDeliverymanTokenByTokenRepositorySpy
  implements IFindDeliverymanTokenByTokenRepository
{
  async findByToken(
    data: IFindDeliverymanTokenByTokenRepository.Input
  ): Promise<IFindDeliverymanTokenByTokenRepository.Output> {
    const { token } = data;

    const deliverymanToken = makeDeliverymanTokenMock();

    Object.assign(deliverymanToken, {
      token,
    });

    return deliverymanToken;
  }
}

export class DeleteDeliverymanTokenByIdRepositorySpy
  implements IDeleteDeliverymanTokenByIdRepository
{
  async deleteById(
    _: IDeleteDeliverymanTokenByIdRepository.Input
  ): Promise<IDeleteDeliverymanTokenByIdRepository.Output> {
    // That's all
  }
}
