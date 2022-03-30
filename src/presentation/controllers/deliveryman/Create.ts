import { DeliverymanAlreadyExistsWithProvidedUsernameError } from '@domain/errors';
import { ICreateDeliverymanUseCase } from '@domain/usecases/deliveryman/Create';

import { created, badRequest, conflict } from '@presentation/helpers/http';
import {
  IController,
  IValidation,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';
import { ValidationError } from '@presentation/validations/errors';

class CreateDeliverymanController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly createDeliverymanUseCase: ICreateDeliverymanUseCase
  ) {}

  async handle(
    request: CreateDeliverymanController.Request
  ): Promise<CreateDeliverymanController.Response> {
    try {
      const validationError = this.validation.validate(request.body);

      if (validationError) {
        throw validationError;
      }

      const { username, password } = request.body;

      await this.createDeliverymanUseCase.execute({
        username,
        password,
      });

      return created<void>();
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }

      if (error instanceof DeliverymanAlreadyExistsWithProvidedUsernameError) {
        return conflict(error);
      }

      throw error;
    }
  }
}

namespace CreateDeliverymanController {
  type RequestBody = {
    username: string;
    password: string;
  };

  export type Request = IHttpRequest<RequestBody>;

  export type Response = IHttpResponse;
}

export { CreateDeliverymanController };
