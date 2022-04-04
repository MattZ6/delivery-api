import { DomainError } from '@domain/errors';

export class DeliveryNotFoundWithProvidedIdError extends DomainError {
  constructor(
    message = 'Delivery not found with provided id.',
    code = 'delivery.not.exists'
  ) {
    super(message, code);
  }
}
