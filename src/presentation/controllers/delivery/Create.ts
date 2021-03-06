import { ClientNotFoundWithProvidedIdError } from '@domain/errors';
import { ICreateDeliveryUseCase } from '@domain/usecases/delivery/Create';

import { created, badRequest, notFound } from '@presentation/helpers/http';
import {
  IController,
  IValidation,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

class CreateDeliveryController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly createDeliveryUseCase: ICreateDeliveryUseCase
  ) {}

  async handle(
    request: CreateDeliveryController.Request
  ): Promise<CreateDeliveryController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { item_name } = request.body;

      await this.createDeliveryUseCase.execute({
        client_id: String(request.client_id),
        item_name,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof ClientNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace CreateDeliveryController {
  export type RequestBody = {
    item_name: string;
  };

  export type Request = IHttpRequest<RequestBody>;

  export type Response = IHttpResponse;
}

export { CreateDeliveryController };
