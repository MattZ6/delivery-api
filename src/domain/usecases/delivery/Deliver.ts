import { Delivery } from '@domain/entities/Delivery';

interface IDeliverDeliveryUseCase {
  execute(
    data: IDeliverDeliveryUseCase.Input
  ): Promise<IDeliverDeliveryUseCase.Output>;
}

namespace IDeliverDeliveryUseCase {
  export type Input = {
    deliveryman_id: string;
    delivery_id: string;
  };

  export type Output = Delivery;
}

export { IDeliverDeliveryUseCase };
