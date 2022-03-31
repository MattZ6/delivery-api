import { DomainError } from '@domain/errors';

export class DeliverymanTokenExpiredError extends DomainError {
  constructor(
    message = 'Token has expired.',
    code = 'deliveryman_token.expired'
  ) {
    super(message, code);
  }
}
