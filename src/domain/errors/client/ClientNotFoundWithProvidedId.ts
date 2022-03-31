import { DomainError } from '@domain/errors';

export class ClientNotFoundWithProvidedIdError extends DomainError {
  constructor(
    message = 'Client not found with provided id.',
    code = 'client.not.exists'
  ) {
    super(message, code);
  }
}
