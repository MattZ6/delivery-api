import { RefreshDeliverymanAccessTokenController } from '@presentation/controllers/deliveryman/RefreshAccessToken';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeRefreshDeliverymanAccessTokenUseCase } from '@main/factories/usecases/deliveryman/RefreshAccessToken';
import { makeRefreshDeliverymanAccessTokenControllerValidation } from '@main/factories/validators/controllers/deliveryman/RefreshAccessToken';

export function makeRefreshDeliverymanAccessTokenController() {
  const validation = makeRefreshDeliverymanAccessTokenControllerValidation();

  const useCase = makeRefreshDeliverymanAccessTokenUseCase();

  const controller = new RefreshDeliverymanAccessTokenController(
    validation,
    useCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
