import { RefreshClientAccessTokenController } from '@presentation/controllers/client/RefreshAccessToken';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeRefreshClientAccessTokenUseCase } from '@main/factories/usecases/client/RefreshAccessToken';
import { makeRefreshClientAccessTokenControllerValidation } from '@main/factories/validators/controllers/client/RefreshAccessToken';

export function makeRefreshClientAccessTokenController() {
  const validation = makeRefreshClientAccessTokenControllerValidation();

  const useCase = makeRefreshClientAccessTokenUseCase();

  const controller = new RefreshClientAccessTokenController(
    validation,
    useCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
