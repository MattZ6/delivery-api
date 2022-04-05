import { ClientNotFoundWithProvidedIdError } from '@domain/errors';
import { IFindAllDeliveriesFromClientUseCase } from '@domain/usecases/delivery/FindAllFromClient';

import { ICheckIfClientExistsByIdRepository } from '@application/protocols/repositories/client';
import { IFindAllDeliveriesFromClientRepository } from '@application/protocols/repositories/delivery';

export class FindAllDeliveriesFromClientUseCase
  implements IFindAllDeliveriesFromClientUseCase
{
  constructor(
    private readonly checkIfClientExistsByIdRepository: ICheckIfClientExistsByIdRepository,
    private readonly defaultSortByValue: IFindAllDeliveriesFromClientUseCase.SortBy,
    private readonly defaultOrderValue: IFindAllDeliveriesFromClientUseCase.Order,
    private readonly defaultLimitValue: IFindAllDeliveriesFromClientUseCase.Limit,
    private readonly defaultOffsetValue: IFindAllDeliveriesFromClientUseCase.Offset,
    private readonly findAllDeliveriesFromClientRepository: IFindAllDeliveriesFromClientRepository
  ) {}

  async execute(
    data: IFindAllDeliveriesFromClientUseCase.Input
  ): Promise<IFindAllDeliveriesFromClientUseCase.Output> {
    const clientExists =
      await this.checkIfClientExistsByIdRepository.checkIfExistsById({
        id: data.client_id,
      });

    if (!clientExists) {
      throw new ClientNotFoundWithProvidedIdError();
    }

    const sort_by = (data.sort_by ??
      this.defaultSortByValue) as IFindAllDeliveriesFromClientUseCase.SortBy;
    const order = (data.order ??
      this.defaultOrderValue) as IFindAllDeliveriesFromClientUseCase.Order;
    const take = Number(data.limit ?? this.defaultLimitValue);
    const skip = Number(data.offset ?? this.defaultOffsetValue);

    const deliveries =
      await this.findAllDeliveriesFromClientRepository.findAllFromClient({
        client_id: data.client_id,
        sort_by,
        order,
        take,
        skip,
      });

    return deliveries;
  }
}
