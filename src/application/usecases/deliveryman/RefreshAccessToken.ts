import {
  DeliverymanTokenExpiredError,
  DeliverymanTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';
import { IRefreshDeliverymanAccessTokenUseCase } from '@domain/usecases/deliveryman/RefreshAccessToken';

import { IEncryptProvider } from '@application/protocols/providers/cryptography/cryptography';
import { IGenerateUuidProvider } from '@application/protocols/providers/uuid';
import {
  ICreateDeliverymanTokenRepository,
  IDeleteDeliverymanTokenByIdRepository,
  IFindDeliverymanTokenByTokenRepository,
} from '@application/protocols/repositories/deliveryman';

export class RefreshDeliverymanAccessTokenUseCase
  implements IRefreshDeliverymanAccessTokenUseCase
{
  constructor(
    private readonly findDeliverymanTokenByTokenRepository: IFindDeliverymanTokenByTokenRepository,
    private readonly encryptProvider: IEncryptProvider,
    private readonly generateUuidProvider: IGenerateUuidProvider,
    private readonly refreshTokenExpiresTimeInMillisseconds: number,
    private readonly createDeliverymanTokenRepository: ICreateDeliverymanTokenRepository,
    private readonly deleteDeliverymanTokenByIdRepository: IDeleteDeliverymanTokenByIdRepository
  ) {}

  async execute(
    data: IRefreshDeliverymanAccessTokenUseCase.Input
  ): Promise<IRefreshDeliverymanAccessTokenUseCase.Output> {
    const { refresh_token } = data;

    const deliverymanToken =
      await this.findDeliverymanTokenByTokenRepository.findByToken({
        token: refresh_token,
      });

    if (!deliverymanToken) {
      throw new DeliverymanTokenNotFoundWithProvidedTokenError();
    }

    const hasExpired = deliverymanToken.expires_in.getTime() < Date.now();

    if (hasExpired) {
      throw new DeliverymanTokenExpiredError();
    }

    const accessToken = await this.encryptProvider.encrypt({
      subject: deliverymanToken.deliveryman_id,
      payload: {
        role: 'deliveryman',
      },
    });

    const expiresDate = new Date(
      Date.now() + this.refreshTokenExpiresTimeInMillisseconds
    );

    const token = await this.generateUuidProvider.generate();

    const newDeliverymanToken =
      await this.createDeliverymanTokenRepository.create({
        token,
        deliveryman_id: deliverymanToken.deliveryman_id,
        expires_in: expiresDate,
      });

    await this.deleteDeliverymanTokenByIdRepository.deleteById({
      id: deliverymanToken.id,
    });

    return {
      access_token: accessToken,
      refresh_token: newDeliverymanToken.token,
    };
  }
}
