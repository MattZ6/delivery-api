import { DomainError } from '@domain/errors';

export class DeliveryAlreadyStartedError extends DomainError {
  constructor(
    message = 'The delivery has already begun.',
    code = 'delivery.started'
  ) {
    super(message, code);
  }
}
