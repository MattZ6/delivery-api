import { AuthenticateClientController } from '@presentation/controllers/client/Authenticate';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeAuthenticateClientUseCase } from '@main/factories/usecases/client/Authenticate';
import { makeAuthenticateClientControllerValidation } from '@main/factories/validators/controllers/client/Authenticate';

export function makeAuthenticateClientController() {
  const validation = makeAuthenticateClientControllerValidation();

  const useCase = makeAuthenticateClientUseCase();

  const controller = new AuthenticateClientController(validation, useCase);

  return makeControllerErrorHandlerDecorator(controller);
}
