import { DeliveryNotFoundWithProvidedIdError } from '@domain/errors';
import { IFindAllDeliveriesFromDeliverymanUseCase } from '@domain/usecases/delivery/FindAllFromDeliveryman';

import { IFindAllDeliveriesFromDeliverymanRepository } from '@application/protocols/repositories/delivery';
import { ICheckIfDeliverymanExistsByIdRepository } from '@application/protocols/repositories/deliveryman';

export class FindAllDeliveriesFromDeliverymanUseCase
  implements IFindAllDeliveriesFromDeliverymanUseCase
{
  constructor(
    private readonly checkIfDeliverymanExistsByIdRepository: ICheckIfDeliverymanExistsByIdRepository,
    private readonly defaultSortByValue: IFindAllDeliveriesFromDeliverymanUseCase.SortBy,
    private readonly defaultOrderValue: IFindAllDeliveriesFromDeliverymanUseCase.Order,
    private readonly defaultLimitValue: IFindAllDeliveriesFromDeliverymanUseCase.Limit,
    private readonly defaultOffsetValue: IFindAllDeliveriesFromDeliverymanUseCase.Offset,
    private readonly findAllDeliveriesFromDeliverymanRepository: IFindAllDeliveriesFromDeliverymanRepository
  ) {}

  async execute(
    data: IFindAllDeliveriesFromDeliverymanUseCase.Input
  ): Promise<IFindAllDeliveriesFromDeliverymanUseCase.Output> {
    const deliverymanExists =
      await this.checkIfDeliverymanExistsByIdRepository.checkIfExistsById({
        id: data.deliveryman_id,
      });

    console.log('---------');
    console.log(deliverymanExists);

    if (!deliverymanExists) {
      throw new DeliveryNotFoundWithProvidedIdError();
    }

    const sort_by = (data.sort_by ??
      this
        .defaultSortByValue) as IFindAllDeliveriesFromDeliverymanUseCase.SortBy;
    const order = (data.order ??
      this.defaultOrderValue) as IFindAllDeliveriesFromDeliverymanUseCase.Order;
    const take = Number(data.limit ?? this.defaultLimitValue);
    const skip = Number(data.offset ?? this.defaultOffsetValue);

    const deliveries =
      await this.findAllDeliveriesFromDeliverymanRepository.findAllFromDeliveryman(
        {
          deliveryman_id: data.deliveryman_id,
          sort_by,
          order,
          take,
          skip,
        }
      );

    return deliveries;
  }
}
