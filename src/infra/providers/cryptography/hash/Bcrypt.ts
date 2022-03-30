import { hash, compare } from 'bcrypt';

import {
  ICompareHashProvider,
  IGenerateHashProvider,
} from '@application/protocols/providers/cryptography/hash';

export class BcryptHashProvider
  implements IGenerateHashProvider, ICompareHashProvider
{
  constructor(private readonly salt: number) {}

  async hash(data: IGenerateHashProvider.Input): Promise<string> {
    const { value } = data;

    return hash(value, this.salt);
  }

  async compare(data: ICompareHashProvider.Input): Promise<boolean> {
    const { value, hashed_value } = data;

    return compare(value, hashed_value);
  }
}
