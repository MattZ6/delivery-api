import { FindAllDeliveriesFromDeliverymanController } from '@presentation/controllers/delivery/FindAllFromDeliveryman';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeFindAllDeliveriesFromDeliverymanUseCase } from '@main/factories/usecases/delivery/FindAllFromDeliveryman';
import { makeFindAllDeliveriesFromDeliverymanControllerValidation } from '@main/factories/validators/controllers/delivery/FindAllFromDeliveryman';

export function makeFindAllDeliveriesFromDeliverymanController() {
  const validation = makeFindAllDeliveriesFromDeliverymanControllerValidation();
  const useCase = makeFindAllDeliveriesFromDeliverymanUseCase();

  const controller = new FindAllDeliveriesFromDeliverymanController(
    validation,
    useCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
