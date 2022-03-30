import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeAuthenticateClientControllerValidation(): ValidationComposite {
  return new ValidationComposite([
    new RequiredFieldValidation('username'),
    new MinLengthFieldValidation('username', 3, true),
    new RequiredFieldValidation('password'),
    new MinLengthFieldValidation('password', 6),
  ]);
}
