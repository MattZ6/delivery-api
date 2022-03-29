import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeCreateClientUseCase } from '@main/factories/usecases/client/CreateClient';
import { makeCreateClientControllerValidation } from '@main/factories/validators/controllers/client/CreateClient';

import { CreateClientController } from '@presentation/controllers/client/CreateClient';

export function makeCreateClientController() {
  const validation = makeCreateClientControllerValidation();

  const useCase = makeCreateClientUseCase();

  const controller = new CreateClientController(validation, useCase);

  return makeControllerErrorHandlerDecorator(controller);
}
