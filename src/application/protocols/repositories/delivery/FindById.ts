import { Delivery } from '@domain/entities/Delivery';

namespace IFindDeliveryByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = Delivery | null;
}

interface IFindDeliveryByIdRepository {
  findById(
    data: IFindDeliveryByIdRepository.Input
  ): Promise<IFindDeliveryByIdRepository.Output>;
}

export { IFindDeliveryByIdRepository };
