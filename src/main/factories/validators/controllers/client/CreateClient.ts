import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
  CompareFieldsValidation,
} from '@presentation/validations/validators';


export function makeCreateClientControllerValidation(): ValidationComposite {
  return new ValidationComposite([
    new RequiredFieldValidation('username'),
    new MinLengthFieldValidation('username', 3, true),
    new RequiredFieldValidation('password'),
    new MinLengthFieldValidation('password', 6),
    new RequiredFieldValidation('password_confirmation'),
    new MinLengthFieldValidation('password_confirmation', 6),
    new CompareFieldsValidation('password_confirmation', 'password'),
  ]);
}
