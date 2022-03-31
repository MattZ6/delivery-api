import {
  RequiredFieldValidation,
  ValidationComposite,
  ValidUuidFieldValidation,
} from '@presentation/validations/validators';

export function makeRefreshDeliverymanAccessTokenControllerValidation(): ValidationComposite {
  return new ValidationComposite([
    new RequiredFieldValidation('refresh_token'),
    new ValidUuidFieldValidation('refresh_token'),
  ]);
}
