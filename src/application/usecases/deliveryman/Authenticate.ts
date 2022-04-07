import {
  DeliverymanNotFoundWithProvidedUsernameError,
  WrongPasswordError,
} from '@domain/errors';
import { IAuthenticateDeliverymanUseCase } from '@domain/usecases/deliveryman/Authenticate';

import { IEncryptProvider } from '@application/protocols/providers/cryptography/cryptography';
import { ICompareHashProvider } from '@application/protocols/providers/cryptography/hash';
import { IGenerateUuidProvider } from '@application/protocols/providers/uuid';
import {
  ICreateDeliverymanTokenRepository,
  IFindDeliverymanByUsernameRepository,
} from '@application/protocols/repositories/deliveryman';

export class AuthenticateDeliverymanUseCase
  implements IAuthenticateDeliverymanUseCase
{
  constructor(
    private readonly findDeliverymanByUsernameRepository: IFindDeliverymanByUsernameRepository,
    private readonly compareHashProvider: ICompareHashProvider,
    private readonly encryptProvider: IEncryptProvider,
    private readonly generateUuidProvider: IGenerateUuidProvider,
    private readonly refreshTokenExpiresTimeInMillisseconds: number,
    private readonly createDeliverymanTokenRepository: ICreateDeliverymanTokenRepository
  ) {}

  async execute(
    data: IAuthenticateDeliverymanUseCase.Input
  ): Promise<IAuthenticateDeliverymanUseCase.Output> {
    const { username, password } = data;

    const deliveryman =
      await this.findDeliverymanByUsernameRepository.findByUsername({
        username,
      });

    if (!deliveryman) {
      throw new DeliverymanNotFoundWithProvidedUsernameError();
    }

    const passwordsMatch = await this.compareHashProvider.compare({
      value: password,
      hashed_value: deliveryman.password_hash,
    });

    if (!passwordsMatch) {
      throw new WrongPasswordError();
    }

    const accessToken = await this.encryptProvider.encrypt({
      subject: deliveryman.id,
      payload: {
        role: 'deliveryman',
      },
    });

    const expiresDate = new Date(
      Date.now() + this.refreshTokenExpiresTimeInMillisseconds
    );

    const token = await this.generateUuidProvider.generate();

    const deliverymanToken = await this.createDeliverymanTokenRepository.create(
      {
        token,
        deliveryman_id: deliveryman.id,
        expires_in: expiresDate,
      }
    );

    return {
      access_token: accessToken,
      refresh_token: deliverymanToken.token,
    };
  }
}
