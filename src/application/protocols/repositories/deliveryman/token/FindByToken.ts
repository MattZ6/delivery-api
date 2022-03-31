import { DeliverymanToken } from '@domain/entities/DeliverymanToken';

interface IFindDeliverymanTokenByTokenRepository {
  findByToken(
    data: IFindDeliverymanTokenByTokenRepository.Input
  ): Promise<IFindDeliverymanTokenByTokenRepository.Output>;
}

namespace IFindDeliverymanTokenByTokenRepository {
  export type Input = {
    token: string;
  };

  export type Output = DeliverymanToken | null;
}

export { IFindDeliverymanTokenByTokenRepository };
