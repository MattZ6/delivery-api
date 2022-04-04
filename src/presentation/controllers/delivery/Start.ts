import {
  DeliveryAlreadyStartedError,
  DeliverymanNotFoundWithProvidedIdError,
  DeliveryNotFoundWithProvidedIdError,
} from '@domain/errors';
import { IStartDeliveryUseCase } from '@domain/usecases/delivery/Start';

import {
  badRequest,
  conflict,
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

class StartDeliveryController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addDeliverymanToDeliveryUseCase: IStartDeliveryUseCase
  ) {}

  async handle(
    request: StartDeliveryController.Request
  ): Promise<StartDeliveryController.Response> {
    try {
      const validationError = this.validation.validate(request.params);

      if (validationError) {
        throw validationError;
      }

      const { delivery_id } = request.params;

      await this.addDeliverymanToDeliveryUseCase.execute({
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

      if (error instanceof DeliveryAlreadyStartedError) {
        return conflict(error);
      }

      if (error instanceof DeliverymanNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace StartDeliveryController {
  export type RequestParams = {
    delivery_id: string;
  };

  export type Request = IHttpRequest<void, RequestParams, void, void>;

  export type Response = IHttpResponse;
}

export { StartDeliveryController };
