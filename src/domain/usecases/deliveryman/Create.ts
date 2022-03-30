import { Deliveryman } from '@domain/entities/Deliveryman';

interface ICreateDeliverymanUseCase {
  execute(
    data: ICreateDeliverymanUseCase.Input
  ): Promise<ICreateDeliverymanUseCase.Output>;
}

namespace ICreateDeliverymanUseCase {
  export type Input = {
    username: string;
    password: string;
  };

  export type Output = Deliveryman;
}

export { ICreateDeliverymanUseCase };
