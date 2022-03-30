import { DomainError } from '@domain/errors';

export class ClientAlreadyExistsWithProvidedUsernameError extends DomainError {
  constructor(
    message = 'There is already a registered client with this username.',
    code = 'client.not.exists'
  ) {
    super(message, code);
  }
}
