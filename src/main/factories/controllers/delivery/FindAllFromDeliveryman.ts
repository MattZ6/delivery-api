import { FindAllDeliveriesFromDeliverymanController } from '@presentation/controllers/delivery/FindAllFromDeliveryman';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeFindAllAvailableDeliveriesUseCase } from '@main/factories/usecases/delivery/FindAllAvailable';
import { makeFindAllDeliveriesFromDeliverymanControllerValidation } from '@main/factories/validators/controllers/delivery/FindAllFromDeliveryman';

export function makeFindAllDeliveriesFromDeliverymanController() {
  const validation = makeFindAllDeliveriesFromDeliverymanControllerValidation();
  const useCase = makeFindAllAvailableDeliveriesUseCase();

  const controller = new FindAllDeliveriesFromDeliverymanController(
    validation,
    useCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
