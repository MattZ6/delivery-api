import { IAuthenticateClientUseCase } from '@domain/usecases/client/Authenticate';

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
