import type { RefreshDeliverymanAccessTokenController } from '@presentation/controllers/deliveryman/RefreshAccessToken';
import {
  RequiredFieldValidation,
  ValidationComposite,
  UuidFieldValidation,
} from '@presentation/validations/validators';

export function makeRefreshDeliverymanAccessTokenControllerValidation(): ValidationComposite {
  type Input = RefreshDeliverymanAccessTokenController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('refresh_token'),
    new UuidFieldValidation('refresh_token'),
  ]);
}
