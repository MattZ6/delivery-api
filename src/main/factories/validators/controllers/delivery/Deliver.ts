import type { DeliverDeliveryController } from '@presentation/controllers/delivery/Deliver';
import {
  RequiredFieldValidation,
  UuidFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeDeliverDeliveryControllerValidation(): ValidationComposite {
  type Input = DeliverDeliveryController.RequestParams;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('delivery_id'),
    new UuidFieldValidation('delivery_id'),
  ]);
}
