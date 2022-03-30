import { DomainError } from '@domain/errors';

export class DeliverymanAlreadyExistsWithProvidedUsernameError extends DomainError {
  constructor(
    message = 'There is already a registered deliveryman with this username.',
    code = 'deliveryman.exists'
  ) {
    super(message, code);
  }
}
