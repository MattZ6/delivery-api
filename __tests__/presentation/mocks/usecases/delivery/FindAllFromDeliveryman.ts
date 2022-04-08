import { IFindAllDeliveriesFromDeliverymanUseCase } from '@domain/usecases/delivery/FindAllFromDeliveryman';

import { makeDeliveryMock } from '../../../../domain';

export function makeFindAllDeliveriesFromDeliverymanUseCaseOutputMock(): IFindAllDeliveriesFromDeliverymanUseCase.Output {
  return [
    makeDeliveryMock(),
    makeDeliveryMock(),
    makeDeliveryMock(),
    makeDeliveryMock(),
    makeDeliveryMock(),
  ];
}

export class FindAllDeliveriesFromDeliverymanUseCaseSpy
  implements IFindAllDeliveriesFromDeliverymanUseCase
{
  async execute(
    _: IFindAllDeliveriesFromDeliverymanUseCase.Input
  ): Promise<IFindAllDeliveriesFromDeliverymanUseCase.Output> {
    return makeFindAllDeliveriesFromDeliverymanUseCaseOutputMock();
  }
}
