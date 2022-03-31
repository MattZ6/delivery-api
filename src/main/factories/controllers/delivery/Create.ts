import { CreateDeliveryController } from '@presentation/controllers/delivery/Create';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeCreateDeliveryUseCase } from '@main/factories/usecases/delivery/Create';
import { makeCreateDeliveryControllerValidation } from '@main/factories/validators/controllers/delivery/Create';

export function makeCreateDeliveryController() {
  const validation = makeCreateDeliveryControllerValidation();

  const useCase = makeCreateDeliveryUseCase();

  const controller = new CreateDeliveryController(validation, useCase);

  return makeControllerErrorHandlerDecorator(controller);
}
