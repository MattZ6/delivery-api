namespace ICheckIfClientExistsByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = boolean;
}

interface ICheckIfClientExistsByIdRepository {
  checkIfExistsById(
    data: ICheckIfClientExistsByIdRepository.Input
  ): Promise<ICheckIfClientExistsByIdRepository.Output>;
}

export { ICheckIfClientExistsByIdRepository };
