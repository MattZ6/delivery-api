import { FindAllDeliveriesFromClientController } from '@presentation/controllers/delivery/FindAllFromClient';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeFindAllDeliveriesFromClientUseCase } from '@main/factories/usecases/delivery/FindAllFromClient';
import { makeFindAllDeliveriesFromClientControllerValidation } from '@main/factories/validators/controllers/delivery/FindAllFromClient';

export function makeFindAllDeliveriesFromClientController() {
  const validation = makeFindAllDeliveriesFromClientControllerValidation();
  const useCase = makeFindAllDeliveriesFromClientUseCase();

  const controller = new FindAllDeliveriesFromClientController(
    validation,
    useCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
