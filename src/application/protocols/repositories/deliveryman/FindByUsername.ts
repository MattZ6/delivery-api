import { Deliveryman } from '@domain/entities/Deliveryman';

namespace IFindDeliverymanByUsernameRepository {
  export type Input = {
    username: string;
  };

  export type Output = Deliveryman | null;
}

interface IFindDeliverymanByUsernameRepository {
  findByUsername(
    data: IFindDeliverymanByUsernameRepository.Input
  ): Promise<IFindDeliverymanByUsernameRepository.Output>;
}

export { IFindDeliverymanByUsernameRepository };
