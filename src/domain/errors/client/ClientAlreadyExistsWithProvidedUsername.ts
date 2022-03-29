import { DomainError } from '@domain/errors';

export class ClientAlreadyExistsWithProvidedUsernameError extends DomainError {
  constructor(
    message = 'There is already a registered user with this username.',
    code = 'user.exists'
  ) {
    super(message, code);
  }
}
