import type { CreateClientController } from '@presentation/controllers/client/Create';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
  CompareFieldsValidation,
} from '@presentation/validations/validators';

export function makeCreateClientControllerValidation(): ValidationComposite {
  type Input = CreateClientController.RequestBody & {
    password_confirmation: string;
  };

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('username'),
    new MinLengthFieldValidation('username', 3, true),
    new RequiredFieldValidation('password'),
    new MinLengthFieldValidation('password', 6),
    new RequiredFieldValidation('password_confirmation'),
    new MinLengthFieldValidation('password_confirmation', 6),
    new CompareFieldsValidation('password_confirmation', 'password'),
  ]);
}
