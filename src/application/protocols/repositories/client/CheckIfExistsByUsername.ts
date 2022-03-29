namespace ICheckIfClientExistsByUsernameRepository {
  export type Input = {
    username: string;
  }

  export type Output = boolean;
}

interface ICheckIfClientExistsByUsernameRepository {
  checkIfExistsByUsername(data: ICheckIfClientExistsByUsernameRepository.Input): Promise<ICheckIfClientExistsByUsernameRepository.Output>;
}

export { ICheckIfClientExistsByUsernameRepository };
