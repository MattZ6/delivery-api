import { IFindAllAvailableDeliveriesUseCase } from '@domain/usecases/delivery/FindAllAvailable';

import { makeDeliveryMock } from '../../../../domain';

export function makeFindAllAvailableDeliveriesUseCaseOutputMock(): IFindAllAvailableDeliveriesUseCase.Output {
  return [
    makeDeliveryMock(),
    makeDeliveryMock(),
    makeDeliveryMock(),
    makeDeliveryMock(),
    makeDeliveryMock(),
  ];
}

export class FindAllAvailableDeliveriesUseCaseSpy
  implements IFindAllAvailableDeliveriesUseCase
{
  async execute(
    _: IFindAllAvailableDeliveriesUseCase.Input
  ): Promise<IFindAllAvailableDeliveriesUseCase.Output> {
    return makeFindAllAvailableDeliveriesUseCaseOutputMock();
  }
}
