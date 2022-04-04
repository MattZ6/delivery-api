import type { AuthenticateClientController } from '@presentation/controllers/client/Authenticate';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeAuthenticateClientControllerValidation(): ValidationComposite {
  type Input = AuthenticateClientController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('username'),
    new MinLengthFieldValidation('username', 3, true),
    new RequiredFieldValidation('password'),
    new MinLengthFieldValidation('password', 6),
  ]);
}
