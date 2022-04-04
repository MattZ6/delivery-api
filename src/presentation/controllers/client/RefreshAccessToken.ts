import {
  ClientTokenExpiredError,
  ClientTokenNotFoundWithProvidedTokenError,
} from '@domain/errors';
import { IRefreshClientAccessTokenUseCase } from '@domain/usecases/clients/RefreshAccessToken';

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

class RefreshClientAccessTokenController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly refreshClientAccessTokenUseCase: IRefreshClientAccessTokenUseCase
  ) {}

  async handle(
    request: RefreshClientAccessTokenController.Request
  ): Promise<RefreshClientAccessTokenController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { refresh_token } = request.body;

      const output = await this.refreshClientAccessTokenUseCase.execute({
        refresh_token,
      });

      return ok(output);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof ClientTokenNotFoundWithProvidedTokenError) {
        return notFound(error);
      }

      if (error instanceof ClientTokenExpiredError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

namespace RefreshClientAccessTokenController {
  export type RequestBody = {
    refresh_token: string;
  };

  export type Request = IHttpRequest<RequestBody, void, void, void>;

  export type Response = IHttpResponse;
}

export { RefreshClientAccessTokenController };
