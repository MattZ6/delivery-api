import { Client } from '@domain/entities/Client';

namespace IFindClientByUsernameRepository {
  export type Input = {
    username: string;
  };

  export type Output = Client | null;
}

interface IFindClientByUsernameRepository {
  findByUsername(
    data: IFindClientByUsernameRepository.Input
  ): Promise<IFindClientByUsernameRepository.Output>;
}

export { IFindClientByUsernameRepository };
