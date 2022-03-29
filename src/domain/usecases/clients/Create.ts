import { ClientModel } from '@domain/models/Client';

interface ICreateClientUseCase {
  execute(data: ICreateClientUseCase.Input): Promise<ICreateClientUseCase.Output>;
}

namespace ICreateClientUseCase {
  export type Input = {
    username: string;
    password: string;
  }

  export type Output = ClientModel;
}

export { ICreateClientUseCase };
