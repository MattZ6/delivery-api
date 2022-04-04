import { Delivery } from '@domain/entities/Delivery';

interface IStartDeliveryUseCase {
  execute(
    data: IStartDeliveryUseCase.Input
  ): Promise<IStartDeliveryUseCase.Output>;
}

namespace IStartDeliveryUseCase {
  export type Input = {
    deliveryman_id: string;
    delivery_id: string;
  };

  export type Output = Delivery;
}

export { IStartDeliveryUseCase };
