import { DeliverymanToken } from '@domain/entities/DeliverymanToken';

interface ICreateDeliverymanTokenRepository {
  create(
    data: ICreateDeliverymanTokenRepository.Input
  ): Promise<ICreateDeliverymanTokenRepository.Output>;
}

namespace ICreateDeliverymanTokenRepository {
  export type Input = {
    token: string;
    deliveryman_id: string;
    expires_in: Date;
  };

  export type Output = DeliverymanToken;
}

export { ICreateDeliverymanTokenRepository };
