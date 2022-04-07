import { ClientAlreadyExistsWithProvidedUsernameError } from '@domain/errors';
import { ICreateClientUseCase } from '@domain/usecases/client/Create';

import { created, badRequest, conflict } from '@presentation/helpers/http';
import {
  IController,
  IValidation,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

class CreateClientController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly createClientUseCase: ICreateClientUseCase
  ) {}

  async handle(
    request: CreateClientController.Request
  ): Promise<CreateClientController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { username, password } = request.body;

      await this.createClientUseCase.execute({
        username,
        password,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof ClientAlreadyExistsWithProvidedUsernameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace CreateClientController {
  export type RequestBody = {
    username: string;
    password: string;
  };

  export type Request = IHttpRequest<RequestBody>;

  export type Response = IHttpResponse;
}

export { CreateClientController };
