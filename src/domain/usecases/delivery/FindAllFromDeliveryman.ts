import { Delivery } from '@domain/entities/Delivery';

interface IFindAllDeliveriesFromDeliverymanUseCase {
  execute(
    data: IFindAllDeliveriesFromDeliverymanUseCase.Input
  ): Promise<IFindAllDeliveriesFromDeliverymanUseCase.Output>;
}

namespace IFindAllDeliveriesFromDeliverymanUseCase {
  export type SortBy = keyof Pick<Delivery, 'created_at' | 'item_name'>;
  export type Order = 'asc' | 'desc';
  export type Limit = number;
  export type Offset = number;

  export type Input = {
    deliveryman_id: string;
    sort_by?: SortBy;
    order?: Order;
    limit?: Limit;
    offset?: Offset;
  };

  export type Output = Delivery[];
}

export { IFindAllDeliveriesFromDeliverymanUseCase };
