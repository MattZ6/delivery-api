import {
  ICreateDeliveryRepository,
  IFindAllAvailableDeliveriesRepository,
  IFindAllDeliveriesFromClientRepository,
  IFindAllDeliveriesFromDeliverymanRepository,
  IFindDeliveryByIdRepository,
  IUpdateDeliveryRepository,
} from '@application/protocols/repositories/delivery';

import { makeDeliveryMock } from '../../../../domain';

export class CreateDeliveryRepositorySpy implements ICreateDeliveryRepository {
  async create(
    data: ICreateDeliveryRepository.Input
  ): Promise<ICreateDeliveryRepository.Output> {
    const { client_id, item_name } = data;

    const deliveryMock = makeDeliveryMock();

    Object.assign(deliveryMock, { client_id, item_name });

    return deliveryMock;
  }
}

export class FindDeliveryByIdRepositorySpy
  implements IFindDeliveryByIdRepository
{
  async findById(
    data: IFindDeliveryByIdRepository.Input
  ): Promise<IFindDeliveryByIdRepository.Output> {
    const { id } = data;

    const deliveryMock = makeDeliveryMock();

    Object.assign(deliveryMock, { id });

    return deliveryMock;
  }
}

export class UpdateDeliveryRepositorySpy implements IUpdateDeliveryRepository {
  async update(
    data: IUpdateDeliveryRepository.Input
  ): Promise<IUpdateDeliveryRepository.Output> {
    const { id, delivered_at, deliveryman_id } = data;

    const deliveryMock = makeDeliveryMock();

    Object.assign(deliveryMock, { id, delivered_at, deliveryman_id });

    return deliveryMock;
  }
}

export class FindAllAvailableDeliveriesRepositorySpy
  implements IFindAllAvailableDeliveriesRepository
{
  async findAllAvailable(
    _: IFindAllAvailableDeliveriesRepository.Input
  ): Promise<IFindAllAvailableDeliveriesRepository.Output> {
    return [];
  }
}

export class FindAllDeliveriesFromClientRepositorySpy
  implements IFindAllDeliveriesFromClientRepository
{
  async findAllFromClient(
    _: IFindAllDeliveriesFromClientRepository.Input
  ): Promise<IFindAllDeliveriesFromClientRepository.Output> {
    return [];
  }
}

export class FindAllDeliveriesFromDeliverymanRepositorySpy
  implements IFindAllDeliveriesFromDeliverymanRepository
{
  async findAllFromDeliveryman(
    _: IFindAllDeliveriesFromDeliverymanRepository.Input
  ): Promise<IFindAllDeliveriesFromDeliverymanRepository.Output> {
    return [];
  }
}
