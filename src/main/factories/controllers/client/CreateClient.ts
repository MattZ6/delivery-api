import { CreateClientController } from '@presentation/controllers/client/Create';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeCreateClientUseCase } from '@main/factories/usecases/client/Create';
import { makeCreateClientControllerValidation } from '@main/factories/validators/controllers/client/Create';

export function makeCreateClientController() {
  const validation = makeCreateClientControllerValidation();

  const useCase = makeCreateClientUseCase();

  const controller = new CreateClientController(validation, useCase);

  return makeControllerErrorHandlerDecorator(controller);
}
