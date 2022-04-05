import { DomainError } from '@domain/errors';

export class DeliveryStartedByAnotherDeliverymanError extends DomainError {
  constructor(
    message = 'The delivery was started by another delivery man.',
    code = 'delivery.from-another-deliveryman'
  ) {
    super(message, code);
  }
}
