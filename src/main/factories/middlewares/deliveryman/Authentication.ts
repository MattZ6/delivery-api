import { DeliverymanAuthenticationMiddleware } from '@presentation/middlewares/deliveryman/Authentication';

import { makeMiddlewareErrorHandlerDecorator } from '@main/factories/decorators/MiddlewareErrorHandler';
import { makeCryptographyProvider } from '@main/factories/providers/cryptography/Cryptography';

export function makeDeliverymanAuthenticationMiddleware() {
  const cryptographyProvider = makeCryptographyProvider();

  const middleware = new DeliverymanAuthenticationMiddleware(
    cryptographyProvider
  );

  return makeMiddlewareErrorHandlerDecorator(middleware);
}
