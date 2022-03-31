import { AuthenticateDeliverymanController } from '@presentation/controllers/deliveryman/Authenticate';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeAuthenticateDeliverymanUseCase } from '@main/factories/usecases/deliveryman/Authenticate';
import { makeAuthenticateDeliverymanControllerValidation } from '@main/factories/validators/controllers/deliveryman/Authenticate';

export function makeAuthenticateDeliverymanController() {
  const validation = makeAuthenticateDeliverymanControllerValidation();

  const useCase = makeAuthenticateDeliverymanUseCase();

  const controller = new AuthenticateDeliverymanController(validation, useCase);

  return makeControllerErrorHandlerDecorator(controller);
}
