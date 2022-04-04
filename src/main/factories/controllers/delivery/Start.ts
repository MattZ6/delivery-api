import { StartDeliveryController } from '@presentation/controllers/delivery/Start';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeStartDeliveryUseCase } from '@main/factories/usecases/delivery/Start';
import { makeStartDeliveryControllerValidation } from '@main/factories/validators/controllers/delivery/Start';

export function makeStartDeliveryController() {
  const validation = makeStartDeliveryControllerValidation();

  const useCase = makeStartDeliveryUseCase();

  const controller = new StartDeliveryController(validation, useCase);

  return makeControllerErrorHandlerDecorator(controller);
}
