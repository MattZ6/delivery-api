import {
  ClientNotFoundWithProvidedUsernameError,
  WrongPasswordError,
} from '@domain/errors';
import { IAuthenticateClientUseCase } from '@domain/usecases/clients/Authenticate';

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

class AuthenticateClientController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly authenticateClientUseCase: IAuthenticateClientUseCase
  ) {}

  async handle(
    request: AuthenticateClientController.Request
  ): Promise<AuthenticateClientController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { username, password } = request.body;

      const authentication = await this.authenticateClientUseCase.execute({
        username,
        password,
      });

      return ok(authentication);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof ClientNotFoundWithProvidedUsernameError) {
        return notFound(error);
      }

      if (error instanceof WrongPasswordError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

namespace AuthenticateClientController {
  export type RequestBody = {
    username: string;
    password: string;
  };

  export type Request = IHttpRequest<RequestBody>;

  export type Response = IHttpResponse;
}

export { AuthenticateClientController };
