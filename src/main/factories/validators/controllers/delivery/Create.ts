import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeCreateDeliveryControllerValidation(): ValidationComposite {
  return new ValidationComposite([
    new RequiredFieldValidation('item_name'),
    new MinLengthFieldValidation('item_name', 3, true),
  ]);
}
