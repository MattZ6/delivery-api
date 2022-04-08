import { DeliverymanNotFoundWithProvidedIdError } from '@domain/errors';
import { IFindAllDeliveriesFromDeliverymanUseCase } from '@domain/usecases/delivery/FindAllFromDeliveryman';

import { badRequest, notFound, ok } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

class FindAllDeliveriesFromDeliverymanController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly findAllDeliveriesFromDeliverymanUseCase: IFindAllDeliveriesFromDeliverymanUseCase
  ) {}

  async handle(
    request: FindAllDeliveriesFromDeliverymanController.Request
  ): Promise<FindAllDeliveriesFromDeliverymanController.Response> {
    try {
      const validationError = this.validation.validate(request.query);

      if (validationError) {
        throw validationError;
      }

      const deliverymanDeliveries =
        await this.findAllDeliveriesFromDeliverymanUseCase.execute({
          deliveryman_id: String(request.deliveryman_id),
          sort_by: request.query.sort_by,
          order: request.query.order,
          limit: request.query.limit,
          offset: request.query.offset,
        });

      return ok(deliverymanDeliveries);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof DeliverymanNotFoundWithProvidedIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

namespace FindAllDeliveriesFromDeliverymanController {
  export type SortBy = IFindAllDeliveriesFromDeliverymanUseCase.SortBy;
  export type Order = IFindAllDeliveriesFromDeliverymanUseCase.Order;
  export type Limit = IFindAllDeliveriesFromDeliverymanUseCase.Limit;
  export type Offset = IFindAllDeliveriesFromDeliverymanUseCase.Offset;

  export type RequestQueryParams = Omit<
    IFindAllDeliveriesFromDeliverymanUseCase.Input,
    'deliveryman_id'
  >;

  export type Request = IHttpRequest<void, void, RequestQueryParams, void>;

  export type Response = IHttpResponse;
}

export { FindAllDeliveriesFromDeliverymanController };
