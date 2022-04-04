namespace ICheckIfDeliverymanExistsByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = boolean;
}

interface ICheckIfDeliverymanExistsByIdRepository {
  checkIfExistsById(
    data: ICheckIfDeliverymanExistsByIdRepository.Input
  ): Promise<ICheckIfDeliverymanExistsByIdRepository.Output>;
}

export { ICheckIfDeliverymanExistsByIdRepository };
