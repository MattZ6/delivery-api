import { Delivery } from '@domain/entities/Delivery';

interface IFindAllAvailableDeliveriesUseCase {
  execute(
    data: IFindAllAvailableDeliveriesUseCase.Input
  ): Promise<IFindAllAvailableDeliveriesUseCase.Output>;
}

namespace IFindAllAvailableDeliveriesUseCase {
  export type SortBy = keyof Pick<Delivery, 'created_at' | 'item_name'>;
  export type Order = 'asc' | 'desc';
  export type Limit = number;
  export type Offset = number;

  export type Input = {
    sort_by?: SortBy;
    order?: Order;
    limit?: Limit;
    offset?: Offset;
  };

  export type Output = Delivery[];
}

export { IFindAllAvailableDeliveriesUseCase };
