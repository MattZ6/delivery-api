import { ICreateClientUseCase } from '@domain/usecases/clients/Create';

import { IController, IHttpRequest, IHttpResponse, IValidation } from '@presentation/protocols';
import { badRequest, conflict, created } from '@presentation/helpers/http';
import { ValidationError } from '@presentation/validations/errors';
import { ClientAlreadyExistsWithProvidedUsernameError } from '@domain/errors';

class CreateClientController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly createClientUseCase: ICreateClientUseCase,
  ) {}

  async handle(request: CreateClientController.Request): Promise<CreateClientController.Response> {
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
  type RequestBody = {
    username: string;
    password: string;
  }

  export type Request = IHttpRequest<RequestBody>;

  export type Response = IHttpResponse;
}

export { CreateClientController };
