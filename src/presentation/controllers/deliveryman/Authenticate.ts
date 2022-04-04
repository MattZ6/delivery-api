import {
  DeliverymanNotFoundWithProvidedUsernameError,
  WrongPasswordError,
} from '@domain/errors';
import { IAuthenticateDeliverymanUseCase } from '@domain/usecases/deliveryman/Authenticate';

import {
  badRequest,
  notFound,
  ok,
  unprocessableEntity,
} from '@presentation/helpers/http';
import {
  IController,
  IValidation,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

class AuthenticateDeliverymanController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly authenticateDeliverymanUseCase: IAuthenticateDeliverymanUseCase
  ) {}

  async handle(
    request: AuthenticateDeliverymanController.Request
  ): Promise<AuthenticateDeliverymanController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { username, password } = request.body;

      const authentication = await this.authenticateDeliverymanUseCase.execute({
        username,
        password,
      });

      return ok(authentication);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof DeliverymanNotFoundWithProvidedUsernameError) {
        return notFound(error);
      }

      if (error instanceof WrongPasswordError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

namespace AuthenticateDeliverymanController {
  export type RequestBody = {
    username: string;
    password: string;
  };

  export type Request = IHttpRequest<RequestBody>;

  export type Response = IHttpResponse;
}

export { AuthenticateDeliverymanController };
