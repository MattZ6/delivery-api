import { FindAllDeliveriesFromClientController } from '@presentation/controllers/delivery/FindAllFromClient';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeFindAllAvailableDeliveriesUseCase } from '@main/factories/usecases/delivery/FindAllAvailable';
import { makeFindAllDeliveriesFromClientControllerValidation } from '@main/factories/validators/controllers/delivery/FindAllFromClient';

export function makeFindAllDeliveriesFromClientController() {
  const validation = makeFindAllDeliveriesFromClientControllerValidation();
  const useCase = makeFindAllAvailableDeliveriesUseCase();

  const controller = new FindAllDeliveriesFromClientController(
    validation,
    useCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
