interface IEncryptProvider {
  encrypt(data: IEncryptProvider.Input): Promise<IEncryptProvider.Output>;
}

namespace IEncryptProvider {
  export type Input = {
    subject: string;
    payload?: any;
  };

  export type Output = string;
}

export { IEncryptProvider };
