import { Delivery } from '@domain/entities/Delivery';

namespace IUpdateDeliveryRepository {
  export type Input = Pick<
    Partial<Delivery>,
    'deliveryman_id' | 'delivered_at'
  > & {
    id: string;
  };

  export type Output = Delivery;
}

interface IUpdateDeliveryRepository {
  update(
    data: IUpdateDeliveryRepository.Input
  ): Promise<IUpdateDeliveryRepository.Output>;
}

export { IUpdateDeliveryRepository };
