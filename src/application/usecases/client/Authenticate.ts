import { IEncryptProvider } from "@application/protocols/providers/cryptography/cryptography";
import { ICompareHashProvider } from "@application/protocols/providers/cryptography/hash";
import { IGenerateUuidProvider } from "@application/protocols/providers/uuid";
import { IFindClientByUsername, ICreateClientTokenRepository } from "@application/protocols/repositories/client";
import { ClientNotFoundWithProvidedUsernameError, WrongPasswordError } from "@domain/errors";
import { IAuthenticateClientUseCase } from "@domain/usecases/clients/Authenticate";

export class AuthenticateClientUseCase implements IAuthenticateClientUseCase {
  constructor(
    private readonly findClientByUsername: IFindClientByUsername,
    private readonly compareHashProvider: ICompareHashProvider,
    private readonly encryptProvider: IEncryptProvider,
    private readonly generateUuidProvider: IGenerateUuidProvider,
    private readonly refreshTokenExpiresTimeInMillisseconds: number,
    private readonly createClientTokenRepository: ICreateClientTokenRepository,
  ) {}

  async execute(data: IAuthenticateClientUseCase.Input): Promise<IAuthenticateClientUseCase.Output> {
    const { username, password } = data;

    const client = await this.findClientByUsername.findByUsername({ username });

    if (!client) {
      throw new ClientNotFoundWithProvidedUsernameError();
    }

    const passwordsMatch = await this.compareHashProvider.compare({
      value: password,
      hashed_value: client.password_hash
    });

    if (!passwordsMatch) {
      throw new WrongPasswordError();
    }

    const accessToken = await this.encryptProvider.encrypt({
      subject: client.id,
      payload: {
        role: 'client'
      }
    });

    const expiresDate = new Date(
      Date.now() + this.refreshTokenExpiresTimeInMillisseconds
    );

    const token = await this.generateUuidProvider.generate();

    const clientToken = await this.createClientTokenRepository.create({
      token,
      client_id: client.id,
      expires_in: expiresDate,
    });

    return {
      access_token: accessToken,
      refresh_token: clientToken.token,
    }
  }
}
