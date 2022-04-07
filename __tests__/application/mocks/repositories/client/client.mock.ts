import {
  ICheckIfClientExistsByIdRepository,
  ICheckIfClientExistsByUsernameRepository,
  ICreateClientRepository,
  IFindClientByUsernameRepository,
} from '@application/protocols/repositories/client';

import { makeClientMock } from '../../../../domain';

export class FindClientByUsernameRepositorySpy
  implements IFindClientByUsernameRepository
{
  async findByUsername(
    data: IFindClientByUsernameRepository.Input
  ): Promise<IFindClientByUsernameRepository.Output> {
    const { username } = data;

    const clientMock = makeClientMock();

    Object.assign(clientMock, { username });

    return clientMock;
  }
}

export class CheckIfClientExistsByUsernameRepositorySpy
  implements ICheckIfClientExistsByUsernameRepository
{
  async checkIfExistsByUsername(
    _: ICheckIfClientExistsByUsernameRepository.Input
  ): Promise<ICheckIfClientExistsByUsernameRepository.Output> {
    return false;
  }
}

export class CreateClientRepositorySpy implements ICreateClientRepository {
  async create(
    data: ICreateClientRepository.Input
  ): Promise<ICreateClientRepository.Output> {
    const { username, password_hash } = data;

    const clientMock = makeClientMock();

    Object.assign(clientMock, { username, password_hash });

    return clientMock;
  }
}

export class CheckIfClientExistsByIdRepositorySpy
  implements ICheckIfClientExistsByIdRepository
{
  async checkIfExistsById(
    _: ICheckIfClientExistsByIdRepository.Input
  ): Promise<ICheckIfClientExistsByIdRepository.Output> {
    return true;
  }
}
