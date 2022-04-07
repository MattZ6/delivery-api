import { IDeliverDeliveryUseCase } from '@domain/usecases/delivery/Deliver';

import { makeDeliveryMock } from '../../../../domain';

export function makeDeliverDeliveryUseCaseOutputMock(): IDeliverDeliveryUseCase.Output {
  return makeDeliveryMock();
}

export class DeliverDeliveryUseCaseSpy implements IDeliverDeliveryUseCase {
  async execute(
    _: IDeliverDeliveryUseCase.Input
  ): Promise<IDeliverDeliveryUseCase.Output> {
    return makeDeliverDeliveryUseCaseOutputMock();
  }
}
