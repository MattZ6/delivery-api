import { sign } from 'jsonwebtoken';

import { IEncryptProvider } from '@application/protocols/providers/cryptography/cryptography/Encrypt';

export class JWTCryptographyProvider implements IEncryptProvider {
  constructor(
    private readonly secret: string,
    private readonly expiresInSeconds: number
  ) {}

  async encrypt(
    data: IEncryptProvider.Input
  ): Promise<IEncryptProvider.Output> {
    const { subject, payload } = data;

    return sign(payload, this.secret, {
      subject,
      expiresIn: this.expiresInSeconds,
    });
  }
}
