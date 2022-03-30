import { CreateDeliverymanController } from '@presentation/controllers/deliveryman/Create';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeCreateDeliverymanUseCase } from '@main/factories/usecases/deliveryman/Create';
import { makeCreateDeliverymanControllerValidation } from '@main/factories/validators/controllers/deliveryman/Create';

export function makeCreateDeliverymanController() {
  const validation = makeCreateDeliverymanControllerValidation();

  const useCase = makeCreateDeliverymanUseCase();

  const controller = new CreateDeliverymanController(validation, useCase);

  return makeControllerErrorHandlerDecorator(controller);
}
