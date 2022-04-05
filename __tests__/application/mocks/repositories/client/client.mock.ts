import { IFindClientByUsernameRepository } from '@application/protocols/repositories/client';

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
