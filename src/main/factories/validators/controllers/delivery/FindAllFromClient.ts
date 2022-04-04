import { FindAllDeliveriesFromClientController } from '@presentation/controllers/delivery/FindAllFromClient';
import {
  OneOfValuesFieldValidation,
  MaxValueFieldValidation,
  MinValueFieldValidation,
  OnlyNumbersFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { deliveryConfig } from '@main/config/env/delivery';

export function makeFindAllDeliveriesFromClientControllerValidation(): ValidationComposite {
  type Input = FindAllDeliveriesFromClientController.RequestQueryParams;
  type SortBy = FindAllDeliveriesFromClientController.SortBy;
  type Order = FindAllDeliveriesFromClientController.Order;

  return new ValidationComposite<Input>([
    new OneOfValuesFieldValidation<Input, SortBy>('sort_by', [
      'created_at',
      'item_name',
    ]),
    new OneOfValuesFieldValidation<Input, Order>('order', ['asc', 'desc']),
    new OnlyNumbersFieldValidation('limit'),
    new MinValueFieldValidation('limit', deliveryConfig.MIN_LIMIT),
    new MaxValueFieldValidation('limit', deliveryConfig.MAX_LIMIT),
    new OnlyNumbersFieldValidation('offset'),
    new MinValueFieldValidation('offset', deliveryConfig.MIN_OFFSET),
  ]);
}
