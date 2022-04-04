import type { RefreshClientAccessTokenController } from '@presentation/controllers/client/RefreshAccessToken';
import {
  RequiredFieldValidation,
  ValidationComposite,
  UuidFieldValidation,
} from '@presentation/validations/validators';

export function makeRefreshClientAccessTokenControllerValidation(): ValidationComposite {
  type Input = RefreshClientAccessTokenController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('refresh_token'),
    new UuidFieldValidation('refresh_token'),
  ]);
}
