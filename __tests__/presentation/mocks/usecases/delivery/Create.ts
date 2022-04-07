import { ICreateDeliveryUseCase } from '@domain/usecases/delivery/Create';

import { makeDeliveryMock } from '../../../../domain';

export function makeCreateDeliveryUseCaseOutputMock(): ICreateDeliveryUseCase.Output {
  return makeDeliveryMock();
}

export class CreateDeliveryUseCaseSpy implements ICreateDeliveryUseCase {
  async execute(
    _: ICreateDeliveryUseCase.Input
  ): Promise<ICreateDeliveryUseCase.Output> {
    return makeCreateDeliveryUseCaseOutputMock();
  }
}
