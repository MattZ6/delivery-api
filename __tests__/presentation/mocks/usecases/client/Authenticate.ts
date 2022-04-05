import { IAuthenticateClientUseCase } from '@domain/usecases/clients/Authenticate';

import { makeAuthenticationMock } from '../../../../domain';

export function makeAuthenticateClientUseCaseOutputMock(): IAuthenticateClientUseCase.Output {
  return makeAuthenticationMock();
}

export class AuthenticateClientUseCaseSpy
  implements IAuthenticateClientUseCase
{
  async execute(
    _: IAuthenticateClientUseCase.Input
  ): Promise<IAuthenticateClientUseCase.Output> {
    return makeAuthenticateClientUseCaseOutputMock();
  }
}
