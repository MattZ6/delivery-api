import { Delivery } from '@domain/entities/Delivery';

namespace ICreateDeliveryRepository {
  export type Input = {
    client_id: string;
    item_name: string;
  };

  export type Output = Delivery;
}

interface ICreateDeliveryRepository {
  create(
    data: ICreateDeliveryRepository.Input
  ): Promise<ICreateDeliveryRepository.Output>;
}

export { ICreateDeliveryRepository };
