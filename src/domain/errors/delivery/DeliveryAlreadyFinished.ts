import { DomainError } from '@domain/errors';

export class DeliveryAlreadyFinishedError extends DomainError {
  constructor(
    message = 'The delivery has already been finalized.',
    code = 'delivery.finished'
  ) {
    super(message, code);
  }
}
