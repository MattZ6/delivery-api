import {
  DeliverymanTokenExpiredError,
  DeliverymanTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';
import { IRefreshDeliverymanAccessTokenUseCase } from '@domain/usecases/deliveryman/RefreshAccessToken';

import {
  badRequest,
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

class RefreshDeliverymanAccessTokenController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly refreshDeliverymanAccessTokenUseCase: IRefreshDeliverymanAccessTokenUseCase
  ) {}

  async handle(
    request: RefreshDeliverymanAccessTokenController.Request
  ): Promise<RefreshDeliverymanAccessTokenController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { refresh_token } = request.body;

      const output = await this.refreshDeliverymanAccessTokenUseCase.execute({
        refresh_token,
      });

      return ok(output);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof DeliverymanTokenNotFoundWithProvidedTokenError) {
        return notFound(error);
      }

      if (error instanceof DeliverymanTokenExpiredError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

namespace RefreshDeliverymanAccessTokenController {
  type RequestBody = {
    refresh_token: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { RefreshDeliverymanAccessTokenController };
