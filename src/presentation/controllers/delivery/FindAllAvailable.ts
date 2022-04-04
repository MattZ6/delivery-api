import { IFindAllAvailableDeliveriesUseCase } from '@domain/usecases/delivery/FindAllAvailable';

import { badRequest, ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

class FindAllAvailableDeliveriesController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly findAllAvailableDeliveriesUseCase: IFindAllAvailableDeliveriesUseCase
  ) {}

  async handle(
    request: FindAllAvailableDeliveriesController.Request
  ): Promise<FindAllAvailableDeliveriesController.Response> {
    try {
      const validationError = this.validation.validate(request.query);

      if (validationError) {
        throw validationError;
      }

      const availableDeliveries =
        await this.findAllAvailableDeliveriesUseCase.execute(request.query);

      return ok(availableDeliveries);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      throw error;
    }
  }
}

namespace FindAllAvailableDeliveriesController {
  export type SortBy = IFindAllAvailableDeliveriesUseCase.SortBy;
  export type Order = IFindAllAvailableDeliveriesUseCase.Order;
  export type Limit = IFindAllAvailableDeliveriesUseCase.Limit;
  export type Offset = IFindAllAvailableDeliveriesUseCase.Offset;

  export type RequestQueryParams = IFindAllAvailableDeliveriesUseCase.Input;

  export type Request = IHttpRequest<void, void, RequestQueryParams, void>;

  export type Response = IHttpResponse;
}

export { FindAllAvailableDeliveriesController };
