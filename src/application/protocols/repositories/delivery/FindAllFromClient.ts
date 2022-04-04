import { Delivery } from '@domain/entities/Delivery';

namespace IFindAllDeliveriesFromClientRepository {
  export type SortBy = keyof Pick<Delivery, 'created_at' | 'item_name'>;
  export type Order = 'asc' | 'desc';
  export type Take = number;
  export type Skip = number;

  export type Input = {
    client_id: string;
    sort_by: SortBy;
    order: Order;
    take: Take;
    skip: Skip;
  };

  export type Output = Delivery[];
}

interface IFindAllDeliveriesFromClientRepository {
  findAllFromClient(
    data: IFindAllDeliveriesFromClientRepository.Input
  ): Promise<IFindAllDeliveriesFromClientRepository.Output>;
}

export { IFindAllDeliveriesFromClientRepository };
