import { DeliverDeliveryController } from '@presentation/controllers/delivery/Deliver';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeDeliverDeliveryUseCase } from '@main/factories/usecases/delivery/Deliver';
import { makeDeliverDeliveryControllerValidation } from '@main/factories/validators/controllers/delivery/Deliver';

export function makeDeliverDeliveryController() {
  const validation = makeDeliverDeliveryControllerValidation();

  const useCase = makeDeliverDeliveryUseCase();

  const controller = new DeliverDeliveryController(validation, useCase);

  return makeControllerErrorHandlerDecorator(controller);
}
