import { StartDeliveryController } from '@presentation/controllers/delivery/Start';
import {
  RequiredFieldValidation,
  UuidFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeStartDeliveryControllerValidation(): ValidationComposite {
  type Input = StartDeliveryController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('delivery_id'),
    new UuidFieldValidation('delivery_id'),
  ]);
}
