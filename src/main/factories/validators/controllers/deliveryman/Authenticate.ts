import type { AuthenticateDeliverymanController } from '@presentation/controllers/deliveryman/Authenticate';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeAuthenticateDeliverymanControllerValidation(): ValidationComposite {
  type Input = AuthenticateDeliverymanController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('username'),
    new MinLengthFieldValidation('username', 3, true),
    new RequiredFieldValidation('password'),
    new MinLengthFieldValidation('password', 6),
  ]);
}
