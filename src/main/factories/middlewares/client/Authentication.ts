import { ClientAuthenticationMiddleware } from '@presentation/middlewares/client/Authentication';

import { makeMiddlewareErrorHandlerDecorator } from '@main/factories/decorators/MiddlewareErrorHandler';
import { makeCryptographyProvider } from '@main/factories/providers/cryptography/Cryptography';

export function makeClientAuthenticationMiddleware() {
  const cryptographyProvider = makeCryptographyProvider();

  const middleware = new ClientAuthenticationMiddleware(cryptographyProvider);

  return makeMiddlewareErrorHandlerDecorator(middleware);
}
