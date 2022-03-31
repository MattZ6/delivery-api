interface IDeleteDeliverymanTokenByIdRepository {
  deleteById(
    data: IDeleteDeliverymanTokenByIdRepository.Input
  ): Promise<IDeleteDeliverymanTokenByIdRepository.Output>;
}

namespace IDeleteDeliverymanTokenByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = void;
}

export { IDeleteDeliverymanTokenByIdRepository };
