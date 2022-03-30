namespace IGenerateHashProvider {
  export type Input = {
    value: string;
  };

  export type Output = string;
}

interface IGenerateHashProvider {
  hash(
    data: IGenerateHashProvider.Input
  ): Promise<IGenerateHashProvider.Output>;
}

export { IGenerateHashProvider };
