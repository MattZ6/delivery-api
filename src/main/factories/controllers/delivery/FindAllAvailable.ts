import { FindAllAvailableDeliveriesController } from '@presentation/controllers/delivery/FindAllAvailable';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeFindAllAvailableDeliveriesUseCase } from '@main/factories/usecases/delivery/FindAllAvailable';
import { makeFindAllAvailableDeliveriesControllerValidation } from '@main/factories/validators/controllers/delivery/FindAllAvailable';

export function makeFindAllAvailableDeliveriesController() {
  const validation = makeFindAllAvailableDeliveriesControllerValidation();
  const useCase = makeFindAllAvailableDeliveriesUseCase();

  const controller = new FindAllAvailableDeliveriesController(
    validation,
    useCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
