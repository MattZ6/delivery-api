import { Delivery } from '@domain/entities/Delivery';

namespace IFindAllAvailableDeliveriesRepository {
  export type SortBy = keyof Pick<Delivery, 'created_at' | 'item_name'>;
  export type Order = 'asc' | 'desc';
  export type Take = number;
  export type Skip = number;

  export type Input = {
    sort_by: SortBy;
    order: Order;
    take: Take;
    skip: Skip;
  };

  export type Output = Delivery[];
}

interface IFindAllAvailableDeliveriesRepository {
  findAllAvailable(
    data: IFindAllAvailableDeliveriesRepository.Input
  ): Promise<IFindAllAvailableDeliveriesRepository.Output>;
}

export { IFindAllAvailableDeliveriesRepository };
