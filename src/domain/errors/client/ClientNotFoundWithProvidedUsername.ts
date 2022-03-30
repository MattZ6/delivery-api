import { DomainError } from '@domain/errors';

export class ClientNotFoundWithProvidedUsernameError extends DomainError {
  constructor(
    message = 'Client not found with provided username.',
    code = 'client.not.exists'
  ) {
    super(message, code);
  }
}
