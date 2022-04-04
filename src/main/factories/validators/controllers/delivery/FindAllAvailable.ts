import { FindAllAvailableDeliveriesController } from '@presentation/controllers/delivery/FindAllAvailable';
import {
  FieldOneOfValidation,
  MaxValueFieldValidation,
  MinValueFieldValidation,
  OnlyNumbersFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { deliveryConfig } from '@main/config/env/delivery';

export function makeFindAllAvailableDeliveriesControllerValidation(): ValidationComposite {
  type Input = FindAllAvailableDeliveriesController.RequestQueryParams;
  type SortBy = FindAllAvailableDeliveriesController.SortBy;
  type Order = FindAllAvailableDeliveriesController.Order;

  return new ValidationComposite<Input>([
    new FieldOneOfValidation<Input, SortBy>('sort_by', [
      'created_at',
      'item_name',
    ]),
    new FieldOneOfValidation<Input, Order>('order', ['asc', 'desc']),
    new OnlyNumbersFieldValidation('limit'),
    new MinValueFieldValidation('limit', deliveryConfig.MIN_LIMIT),
    new MaxValueFieldValidation('limit', deliveryConfig.MAX_LIMIT),
    new OnlyNumbersFieldValidation('offset'),
    new MinValueFieldValidation('offset', deliveryConfig.MIN_OFFSET),
  ]);
}
