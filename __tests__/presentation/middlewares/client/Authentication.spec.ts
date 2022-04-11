import {
  AccessTokenNotProvidedError,
  InvalidTokenError,
  PermissionDeniedError,
  TokenExpiredError,
} from '@presentation/errors';
import { forbidden, ok, unauthorized } from '@presentation/helpers/http';
import { ClientAuthenticationMiddleware } from '@presentation/middlewares/client/Authentication';

import {
  makeVerifyCriptographyProviderOutputMock,
  VerifyCriptographyProviderSpy,
} from '../../../application/mocks';
import { makeErrorMock } from '../../../domain';
import { makeClientAuthenticationMiddlewareRequestMock } from '../../mocks';

let verifyCriptographyProviderSpy: VerifyCriptographyProviderSpy;

let clientAuthenticationMiddleware: ClientAuthenticationMiddleware;

describe('ClientAuthenticationMiddleware', () => {
  beforeEach(() => {
    verifyCriptographyProviderSpy = new VerifyCriptographyProviderSpy();

    clientAuthenticationMiddleware = new ClientAuthenticationMiddleware(
      verifyCriptographyProviderSpy
    );
  });

  it('should return unauthorized (401) if ClientAuthenticationMiddleware throws a AccessTokenNotProvidedError', async () => {
    const request = makeClientAuthenticationMiddlewareRequestMock();

    request.headers['x-access-token'] = undefined as any;

    const response = await clientAuthenticationMiddleware.handle(request);

    expect(response).toEqual(unauthorized(new AccessTokenNotProvidedError()));
  });

  it('should call VerifyCriptographyProvider once with correct values', async () => {
    const verifySpy = jest.spyOn(verifyCriptographyProviderSpy, 'verify');

    const request = makeClientAuthenticationMiddlewareRequestMock();

    await clientAuthenticationMiddleware.handle(request);

    expect(verifySpy).toHaveBeenCalledTimes(1);
    expect(verifySpy).toHaveBeenCalledWith({
      value: request.headers['x-access-token'],
    });
  });

  it('should throw if VerifyCriptographyProvider throws', async () => {
    const errorMock = makeErrorMock();

    jest
      .spyOn(verifyCriptographyProviderSpy, 'verify')
      .mockRejectedValueOnce(errorMock);

    const request = makeClientAuthenticationMiddlewareRequestMock();

    const promise = clientAuthenticationMiddleware.handle(request);

    await expect(promise).rejects.toThrowError(errorMock);
  });

  it('should return unauthorized (401) if VerifyCriptographyProvider throws a InvalidTokenError', async () => {
    const errorMock = new InvalidTokenError();

    jest
      .spyOn(verifyCriptographyProviderSpy, 'verify')
      .mockRejectedValueOnce(errorMock);

    const request = makeClientAuthenticationMiddlewareRequestMock();

    const response = await clientAuthenticationMiddleware.handle(request);

    expect(response).toEqual(unauthorized(errorMock));
  });

  it('should return unauthorized (401) if VerifyCriptographyProvider throws a TokenExpiredError', async () => {
    const errorMock = new TokenExpiredError();

    jest
      .spyOn(verifyCriptographyProviderSpy, 'verify')
      .mockRejectedValueOnce(errorMock);

    const request = makeClientAuthenticationMiddlewareRequestMock();

    const response = await clientAuthenticationMiddleware.handle(request);

    expect(response).toEqual(unauthorized(errorMock));
  });

  it('should return forbidden (403) if ClientAuthenticationMiddleware throws a PermissionDeniedError', async () => {
    const outputMock = makeVerifyCriptographyProviderOutputMock();

    outputMock.payload = {};

    jest
      .spyOn(verifyCriptographyProviderSpy, 'verify')
      .mockResolvedValueOnce(outputMock);

    const request = makeClientAuthenticationMiddlewareRequestMock();

    const response = await clientAuthenticationMiddleware.handle(request);

    expect(response).toEqual(forbidden(new PermissionDeniedError()));
  });

  it('should return ok (200) on success', async () => {
    const outputMock = makeVerifyCriptographyProviderOutputMock();

    outputMock.payload = {
      role: 'client',
    };

    jest
      .spyOn(verifyCriptographyProviderSpy, 'verify')
      .mockResolvedValueOnce(outputMock);

    const request = makeClientAuthenticationMiddlewareRequestMock();

    const response = await clientAuthenticationMiddleware.handle(request);

    expect(response).toEqual(ok({ client_id: outputMock.subject }));
  });
});
