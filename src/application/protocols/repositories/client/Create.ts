import { ClientModel } from '@domain/models/Client';

namespace ICreateClientRepository {
  export type Input = {
    username: string;
    password_hash: string;
  }

  export type Output = ClientModel;
}

interface ICreateClientRepository {
  create(data: ICreateClientRepository.Input): Promise<ICreateClientRepository.Output>;
}

export { ICreateClientRepository };
