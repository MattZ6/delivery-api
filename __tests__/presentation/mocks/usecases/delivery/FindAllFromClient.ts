import { IFindAllDeliveriesFromClientUseCase } from '@domain/usecases/delivery/FindAllFromClient';

import { makeDeliveryMock } from '../../../../domain';

export function makeFindAllDeliveriesFromClientUseCaseOutputMock(): IFindAllDeliveriesFromClientUseCase.Output {
  return [
    makeDeliveryMock(),
    makeDeliveryMock(),
    makeDeliveryMock(),
    makeDeliveryMock(),
    makeDeliveryMock(),
  ];
}

export class FindAllDeliveriesFromClientUseCaseSpy
  implements IFindAllDeliveriesFromClientUseCase
{
  async execute(
    _: IFindAllDeliveriesFromClientUseCase.Input
  ): Promise<IFindAllDeliveriesFromClientUseCase.Output> {
    return makeFindAllDeliveriesFromClientUseCaseOutputMock();
  }
}
