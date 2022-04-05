import { DomainError } from '@domain/errors';

export class DeliveryNotStartedError extends DomainError {
  constructor(
    message = 'The delivery was not started.',
    code = 'delivery.not.started'
  ) {
    super(message, code);
  }
}
