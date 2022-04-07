import { ICreateDeliverymanUseCase } from '@domain/usecases/deliveryman/Create';

import { makeDeliverymanMock } from '../../../../domain';

export function makeCreateDeliverymanUseCaseOutputMock(): ICreateDeliverymanUseCase.Output {
  return makeDeliverymanMock();
}

export class CreateDeliverymanUseCaseSpy implements ICreateDeliverymanUseCase {
  async execute(
    _: ICreateDeliverymanUseCase.Input
  ): Promise<ICreateDeliverymanUseCase.Output> {
    return makeCreateDeliverymanUseCaseOutputMock();
  }
}
