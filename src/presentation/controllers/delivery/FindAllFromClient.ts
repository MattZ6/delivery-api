import { ClientNotFoundWithProvidedIdError } from '@domain/errors';
import { IFindAllDeliveriesFromClientUseCase } from '@domain/usecases/delivery/FindAllFromClient';

import { badRequest, notFound, ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

class FindAllDeliveriesFromClientController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly findAllDeliveriesFromClientUseCase: IFindAllDeliveriesFromClientUseCase
  ) {}

  async handle(
    request: FindAllDeliveriesFromClientController.Request
  ): Promise<FindAllDeliveriesFromClientController.Response> {
    try {
      const validationError = this.validation.validate(request.query);

      if (validationError) {
        throw validationError;
      }

      const clientDeliveries =
        await this.findAllDeliveriesFromClientUseCase.execute({
          client_id: String(request.client_id),
          sort_by: request.query.sort_by,
          order: request.query.order,
          limit: request.query.limit,
          offset: request.query.offset,
        });

      return ok(clientDeliveries);
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

namespace FindAllDeliveriesFromClientController {
  export type SortBy = IFindAllDeliveriesFromClientUseCase.SortBy;
  export type Order = IFindAllDeliveriesFromClientUseCase.Order;
  export type Limit = IFindAllDeliveriesFromClientUseCase.Limit;
  export type Offset = IFindAllDeliveriesFromClientUseCase.Offset;

  export type RequestQueryParams = Omit<
    IFindAllDeliveriesFromClientUseCase.Input,
    'client_id'
  >;

  export type Request = IHttpRequest<void, void, RequestQueryParams, void>;

  export type Response = IHttpResponse;
}

export { FindAllDeliveriesFromClientController };
