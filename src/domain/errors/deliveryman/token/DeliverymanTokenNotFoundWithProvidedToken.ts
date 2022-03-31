import { DomainError } from '@domain/errors';

export class DeliverymanTokenNotFoundWithProvidedTokenError extends DomainError {
  constructor(
    message = 'Token not found.',
    code = 'deliveryman_token.not.exists'
  ) {
    super(message, code);
  }
}
