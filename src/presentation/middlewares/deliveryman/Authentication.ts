import { IVerifyCriptographyProvider } from '@application/protocols/providers/cryptography/cryptography';

import {
  AccessTokenNotProvidedError,
  InvalidTokenError,
  PermissionDeniedError,
  TokenExpiredError,
} from '@presentation/errors';
import { forbidden, ok, unauthorized } from '@presentation/helpers/http';
import {
  IHttpRequest,
  IHttpResponse,
  IMiddleware,
} from '@presentation/protocols';

class DeliverymanAuthenticationMiddleware implements IMiddleware {
  constructor(
    private readonly verifyCriptographyProvider: IVerifyCriptographyProvider
  ) {}

  async handle(
    request: DeliverymanAuthenticationMiddleware.Request
  ): Promise<DeliverymanAuthenticationMiddleware.Response> {
    try {
      const accessToken = request.headers['x-access-token'];

      if (!accessToken) {
        throw new AccessTokenNotProvidedError();
      }

      const { subject, payload } =
        await this.verifyCriptographyProvider.verify<DeliverymanAuthenticationMiddleware.TokenPayload>(
          {
            value: accessToken,
          }
        );

      if (payload.role !== 'deliveryman') {
        throw new PermissionDeniedError();
      }

      return ok<DeliverymanAuthenticationMiddleware.ResponseBody>({
        deliveryman_id: subject,
      });
    } catch (error) {
      if (error instanceof AccessTokenNotProvidedError) {
        return unauthorized(error);
      }

      if (error instanceof InvalidTokenError) {
        return unauthorized(error);
      }

      if (error instanceof TokenExpiredError) {
        return unauthorized(error);
      }

      if (error instanceof PermissionDeniedError) {
        return forbidden(error);
      }

      throw error;
    }
  }
}

namespace DeliverymanAuthenticationMiddleware {
  type RequestHeaders = {
    ['x-access-token']: string;
  };

  export type Request = IHttpRequest<unknown, unknown, unknown, RequestHeaders>;

  export type Response = IHttpResponse;

  export type ResponseBody = {
    deliveryman_id: string;
  };

  export type TokenPayload = {
    role?: 'client' | 'deliveryman';
  };
}

export { DeliverymanAuthenticationMiddleware };
