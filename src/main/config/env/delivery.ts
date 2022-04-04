import { IFindAllAvailableDeliveriesRepository } from '@application/protocols/repositories/delivery';

export const deliveryConfig = {
  /** Find all available */

  DEFAULT_SORT_BY: 'created_at' as IFindAllAvailableDeliveriesRepository.SortBy,
  DEFAULT_ORDER: 'asc' as IFindAllAvailableDeliveriesRepository.Order,

  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
  DEFAULT_LIMIT: 30,

  MIN_OFFSET: 0,
  DEFAULT_OFFSET: 0,
};
