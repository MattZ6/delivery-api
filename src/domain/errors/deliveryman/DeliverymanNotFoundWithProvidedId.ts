import { DomainError } from '@domain/errors';

export class DeliverymanNotFoundWithProvidedIdError extends DomainError {
  constructor(
    message = 'Deliveryman not found with provided id.',
    code = 'deliveryman.not.exists'
  ) {
    super(message, code);
  }
}
