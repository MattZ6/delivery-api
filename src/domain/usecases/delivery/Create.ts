import { Delivery } from '@domain/entities/Delivery';

interface ICreateDeliveryUseCase {
  execute(
    data: ICreateDeliveryUseCase.Input
  ): Promise<ICreateDeliveryUseCase.Output>;
}

namespace ICreateDeliveryUseCase {
  export type Input = {
    item_name: string;
    client_id: string;
  };

  export type Output = Delivery;
}

export { ICreateDeliveryUseCase };
