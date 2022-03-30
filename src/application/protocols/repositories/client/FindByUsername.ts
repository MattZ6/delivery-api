import { Client } from '@domain/entities/Client';

namespace IFindClientByUsername {
  export type Input = {
    username: string;
  }

  export type Output = Client | null;
}

interface IFindClientByUsername {
  findByUsername(data: IFindClientByUsername.Input): Promise<IFindClientByUsername.Output>;
}

export { IFindClientByUsername };
