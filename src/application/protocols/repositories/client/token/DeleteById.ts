interface IDeleteClientTokenByIdRepository {
  deleteById(
    data: IDeleteClientTokenByIdRepository.Input
  ): Promise<IDeleteClientTokenByIdRepository.Output>;
}

namespace IDeleteClientTokenByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = void;
}

export { IDeleteClientTokenByIdRepository };
