import {
  ClientTokenExpiredError,
  ClientTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';
import { IRefreshClientAccessTokenUseCase } from '@domain/usecases/client/RefreshAccessToken';

import { IEncryptProvider } from '@application/protocols/providers/cryptography/cryptography';
import { IGenerateUuidProvider } from '@application/protocols/providers/uuid';
import {
  ICreateClientTokenRepository,
  IDeleteClientTokenByIdRepository,
  IFindClientTokenByTokenRepository,
} from '@application/protocols/repositories/client';

export class RefreshClientAccessTokenUseCase
  implements IRefreshClientAccessTokenUseCase
{
  constructor(
    private readonly findClientTokenByTokenRepository: IFindClientTokenByTokenRepository,
    private readonly encryptProvider: IEncryptProvider,
    private readonly generateUuidProvider: IGenerateUuidProvider,
    private readonly refreshTokenExpiresTimeInMillisseconds: number,
    private readonly createClientTokenRepository: ICreateClientTokenRepository,
    private readonly deleteClientTokenByIdRepository: IDeleteClientTokenByIdRepository
  ) {}

  async execute(
    data: IRefreshClientAccessTokenUseCase.Input
  ): Promise<IRefreshClientAccessTokenUseCase.Output> {
    const { refresh_token } = data;

    const clientToken = await this.findClientTokenByTokenRepository.findByToken(
      { token: refresh_token }
    );

    if (!clientToken) {
      throw new ClientTokenNotFoundWithProvidedTokenError();
    }

    const hasExpired = clientToken.expires_in.getTime() < Date.now();

    if (hasExpired) {
      throw new ClientTokenExpiredError();
    }

    const accessToken = await this.encryptProvider.encrypt({
      subject: clientToken.client_id,
      payload: {
        role: 'client',
      },
    });

    const expiresDate = new Date(
      Date.now() + this.refreshTokenExpiresTimeInMillisseconds
    );

    const token = await this.generateUuidProvider.generate();

    const newClientToken = await this.createClientTokenRepository.create({
      token,
      client_id: clientToken.client_id,
      expires_in: expiresDate,
    });

    await this.deleteClientTokenByIdRepository.deleteById({
      id: clientToken.id,
    });

    return {
      access_token: accessToken,
      refresh_token: newClientToken.token,
    };
  }
}
