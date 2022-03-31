import { DomainError } from '@domain/errors';

export class ClientTokenExpiredError extends DomainError {
  constructor(message = 'Token has expired.', code = 'client_token.expired') {
    super(message, code);
  }
}
