import { faker } from '@faker-js/faker';

import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

export function makeControllerHttpRequestMock(): IHttpRequest {
  return {
    query: {},
    body: {},
    headers: {},
    params: {},
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    client_id: faker.datatype.uuid(),
    deliveryman_id: faker.datatype.uuid(),
  };
}

export function makeControllerHttpResponseMock(): IHttpResponse {
  return {
    statusCode: faker.internet.port(),
    body: {},
  };
}

export class ControllerSpy implements IController {
  async handle(_: IHttpRequest): Promise<IHttpResponse> {
    return makeControllerHttpResponseMock();
  }
}
