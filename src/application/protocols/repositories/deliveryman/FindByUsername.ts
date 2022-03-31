import { Deliveryman } from '@domain/entities/Deliveryman';

namespace IFindDeliverymanByUsername {
  export type Input = {
    username: string;
  };

  export type Output = Deliveryman | null;
}

interface IFindDeliverymanByUsername {
  findByUsername(
    data: IFindDeliverymanByUsername.Input
  ): Promise<IFindDeliverymanByUsername.Output>;
}

export { IFindDeliverymanByUsername };
