import { IFindAllAvailableDeliveriesUseCase } from '@domain/usecases/delivery/FindAllAvailable';

import { IFindAllAvailableDeliveriesRepository } from '@application/protocols/repositories/delivery';

export class FindAllAvailableDeliveriesUseCase
  implements IFindAllAvailableDeliveriesUseCase
{
  constructor(
    private readonly defaultSortByValue: IFindAllAvailableDeliveriesUseCase.SortBy,
    private readonly defaultOrderValue: IFindAllAvailableDeliveriesUseCase.Order,
    private readonly defaultLimitValue: IFindAllAvailableDeliveriesUseCase.Limit,
    private readonly defaultOffsetValue: IFindAllAvailableDeliveriesUseCase.Offset,
    private readonly findAllAvailableDeliveriesRepository: IFindAllAvailableDeliveriesRepository
  ) {}

  async execute(
    data: IFindAllAvailableDeliveriesUseCase.Input
  ): Promise<IFindAllAvailableDeliveriesUseCase.Output> {
    const sort_by = (data.sort_by ??
      this.defaultSortByValue) as IFindAllAvailableDeliveriesUseCase.SortBy;
    const order = (data.order ??
      this.defaultOrderValue) as IFindAllAvailableDeliveriesUseCase.Order;
    const take = Number(data.limit ?? this.defaultLimitValue);
    const skip = Number(data.offset ?? this.defaultOffsetValue);

    const availableDeliveries =
      await this.findAllAvailableDeliveriesRepository.findAllAvailable({
        sort_by,
        order,
        take,
        skip,
      });

    return availableDeliveries;
  }
}
