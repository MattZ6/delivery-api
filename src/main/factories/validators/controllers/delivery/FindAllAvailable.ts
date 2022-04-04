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
  type FieldName =
    keyof FindAllAvailableDeliveriesController.RequestQueryParams;

  return new ValidationComposite([
    new FieldOneOfValidation<
      FieldName,
      FindAllAvailableDeliveriesController.SortBy
    >('sort_by', ['created_at', 'item_name']),
    new FieldOneOfValidation<
      FieldName,
      FindAllAvailableDeliveriesController.Order
    >('order', ['asc', 'desc']),
    new OnlyNumbersFieldValidation<FieldName>('limit'),
    new MinValueFieldValidation<FieldName>('limit', deliveryConfig.MIN_LIMIT),
    new MaxValueFieldValidation<FieldName>('limit', deliveryConfig.MAX_LIMIT),
    new OnlyNumbersFieldValidation<FieldName>('offset'),
    new MinValueFieldValidation<FieldName>('offset', deliveryConfig.MIN_OFFSET),
  ]);
}
