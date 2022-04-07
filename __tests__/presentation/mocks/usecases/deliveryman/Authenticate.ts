import { IAuthenticateDeliverymanUseCase } from '@domain/usecases/deliveryman/Authenticate';

import { makeAuthenticationMock } from '../../../../domain';

export function makeAuthenticateDeliverymanUseCaseOutputMock(): IAuthenticateDeliverymanUseCase.Output {
  return makeAuthenticationMock();
}

export class AuthenticateDeliverymanUseCaseSpy
  implements IAuthenticateDeliverymanUseCase
{
  async execute(
    _: IAuthenticateDeliverymanUseCase.Input
  ): Promise<IAuthenticateDeliverymanUseCase.Output> {
    return makeAuthenticateDeliverymanUseCaseOutputMock();
  }
}
