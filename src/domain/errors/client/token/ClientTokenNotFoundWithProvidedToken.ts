import { DomainError } from '@domain/errors';

export class ClientTokenNotFoundWithProvidedTokenError extends DomainError {
  constructor(message = 'Token not found.', code = 'client_token.not.exists') {
    super(message, code);
  }
}
