import {
  DeliveryAlreadyFinishedError,
  DeliverymanNotFoundWithProvidedIdError,
  DeliveryNotFoundWithProvidedIdError,
  DeliveryStartedByAnotherDeliverymanError,
} from '@domain/errors';
import { IDeliverDeliveryUseCase } from '@domain/usecases/delivery/Deliver';

import {
  badRequest,
  conflict,
  forbidden,
  noContent,
  notFound,
} from '@presentation/helpers/http';
import {
  IController,
  IValidation,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

class DeliverDeliveryController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly deliverDeliveryUseCase: IDeliverDeliveryUseCase
  ) {}

  async handle(
    request: DeliverDeliveryController.Request
  ): Promise<DeliverDeliveryController.Response> {
    try {
      const validationError = this.validation.validate(request.params);

      if (validationError) {
        throw validationError;
      }

      const { delivery_id } = request.params;

      await this.deliverDeliveryUseCase.execute({
        delivery_id,
        deliveryman_id: String(request.deliveryman_id),
      });

      return noContent();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof DeliveryNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof DeliverymanNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      if (error instanceof DeliveryStartedByAnotherDeliverymanError) {
        return forbidden(error);
      }

      if (error instanceof DeliveryAlreadyFinishedError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace DeliverDeliveryController {
  export type RequestParams = {
    delivery_id: string;
  };

  export type Request = IHttpRequest<void, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { DeliverDeliveryController };
