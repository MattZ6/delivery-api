import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeRefreshClientAccessTokenControllerValidation(): ValidationComposite {
  return new ValidationComposite([
    new RequiredFieldValidation('refresh_token'),
  ]);
}
