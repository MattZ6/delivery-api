import { Deliveryman } from '@domain/entities/Deliveryman';

namespace ICreateDeliverymanRepository {
  export type Input = {
    username: string;
    password_hash: string;
  };

  export type Output = Deliveryman;
}

interface ICreateDeliverymanRepository {
  create(
    data: ICreateDeliverymanRepository.Input
  ): Promise<ICreateDeliverymanRepository.Output>;
}

export { ICreateDeliverymanRepository };
