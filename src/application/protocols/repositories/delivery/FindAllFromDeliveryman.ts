import { Delivery } from '@domain/entities/Delivery';

namespace IFindAllDeliveriesFromDeliverymanRepository {
  export type SortBy = keyof Pick<Delivery, 'created_at' | 'item_name'>;
  export type Order = 'asc' | 'desc';
  export type Take = number;
  export type Skip = number;

  export type Input = {
    deliveryman_id: string;
    sort_by: SortBy;
    order: Order;
    take: Take;
    skip: Skip;
  };

  export type Output = Delivery[];
}

interface IFindAllDeliveriesFromDeliverymanRepository {
  findAllFromDeliveryman(
    data: IFindAllDeliveriesFromDeliverymanRepository.Input
  ): Promise<IFindAllDeliveriesFromDeliverymanRepository.Output>;
}

export { IFindAllDeliveriesFromDeliverymanRepository };
