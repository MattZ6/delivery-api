import { Client } from '@domain/entities/Client';

namespace ICreateClientRepository {
  export type Input = {
    username: string;
    password_hash: string;
  }

  export type Output = Client;
}

interface ICreateClientRepository {
  create(data: ICreateClientRepository.Input): Promise<ICreateClientRepository.Output>;
}

export { ICreateClientRepository };
