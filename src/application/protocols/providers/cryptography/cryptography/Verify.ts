interface IVerifyCriptographyProvider {
  verify(
    data: IVerifyCriptographyProvider.Input
  ): Promise<IVerifyCriptographyProvider.Output>;
}

namespace IVerifyCriptographyProvider {
  export type Input = {
    value: string;
  };

  export type Output = {
    subject: string;
    payload: any;
  };
}

export { IVerifyCriptographyProvider };
