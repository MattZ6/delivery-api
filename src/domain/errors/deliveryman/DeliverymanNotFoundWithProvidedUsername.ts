import { DomainError } from '@domain/errors';

export class DeliverymanNotFoundWithProvidedUsernameError extends DomainError {
  constructor(
    message = 'Deliveryman not found with provided username.',
    code = 'deliveryman.not.exists'
  ) {
    super(message, code);
  }
}
