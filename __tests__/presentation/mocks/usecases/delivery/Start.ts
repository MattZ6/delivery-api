import { IStartDeliveryUseCase } from '@domain/usecases/delivery/Start';

import { makeDeliveryMock } from '../../../../domain';

export function makeStartDeliveryUseCaseOutputMock(): IStartDeliveryUseCase.Output {
  return makeDeliveryMock();
}

export class StartDeliveryUseCaseSpy implements IStartDeliveryUseCase {
  async execute(
    _: IStartDeliveryUseCase.Input
  ): Promise<IStartDeliveryUseCase.Output> {
    return makeStartDeliveryUseCaseOutputMock();
  }
}
