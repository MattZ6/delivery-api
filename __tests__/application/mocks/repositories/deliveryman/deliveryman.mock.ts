import {
  ICheckIfDeliverymanExistsByIdRepository,
  ICheckIfDeliverymanExistsByUsernameRepository,
  ICreateDeliverymanRepository,
  IFindDeliverymanByUsernameRepository,
} from '@application/protocols/repositories/deliveryman';

import { makeDeliverymanMock } from '../../../../domain';

export class FindDeliverymanByUsernameRepositorySpy
  implements IFindDeliverymanByUsernameRepository
{
  async findByUsername(
    data: IFindDeliverymanByUsernameRepository.Input
  ): Promise<IFindDeliverymanByUsernameRepository.Output> {
    const { username } = data;

    const deliverymanMock = makeDeliverymanMock();

    Object.assign(deliverymanMock, { username });

    return deliverymanMock;
  }
}

export class CheckIfDeliverymanExistsByUsernameRepositorySpy
  implements ICheckIfDeliverymanExistsByUsernameRepository
{
  async checkIfExistsByUsername(
    _: ICheckIfDeliverymanExistsByUsernameRepository.Input
  ): Promise<ICheckIfDeliverymanExistsByUsernameRepository.Output> {
    return false;
  }
}

export class CreateDeliverymanRepositorySpy
  implements ICreateDeliverymanRepository
{
  async create(
    data: ICreateDeliverymanRepository.Input
  ): Promise<ICreateDeliverymanRepository.Output> {
    const { username, password_hash } = data;

    const deliverymanMock = makeDeliverymanMock();

    Object.assign(deliverymanMock, { username, password_hash });

    return deliverymanMock;
  }
}

export class CheckIfDeliverymanExistsByIdRepositorySpy
  implements ICheckIfDeliverymanExistsByIdRepository
{
  async checkIfExistsById(
    _: ICheckIfDeliverymanExistsByIdRepository.Input
  ): Promise<ICheckIfDeliverymanExistsByIdRepository.Output> {
    return true;
  }
}
