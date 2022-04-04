import type { CreateDeliveryController } from '@presentation/controllers/delivery/Create';
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

export function makeCreateDeliveryControllerValidation(): ValidationComposite {
  type Input = CreateDeliveryController.RequestBody;

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('item_name'),
    new MinLengthFieldValidation('item_name', 3, true),
  ]);
}
