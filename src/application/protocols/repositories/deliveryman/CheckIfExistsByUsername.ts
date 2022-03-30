namespace ICheckIfDeliverymanExistsByUsernameRepository {
  export type Input = {
    username: string;
  };

  export type Output = boolean;
}

interface ICheckIfDeliverymanExistsByUsernameRepository {
  checkIfExistsByUsername(
    data: ICheckIfDeliverymanExistsByUsernameRepository.Input
  ): Promise<ICheckIfDeliverymanExistsByUsernameRepository.Output>;
}

export { ICheckIfDeliverymanExistsByUsernameRepository };
