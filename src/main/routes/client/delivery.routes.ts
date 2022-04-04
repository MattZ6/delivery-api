import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middlewareAdapter';
import { adaptRoute } from '@main/adapters/express/routeAdapter';
import { makeCreateDeliveryController } from '@main/factories/controllers/delivery/Create';
import { makeFindAllDeliveriesFromClientController } from '@main/factories/controllers/delivery/FindAllFromClient';
import { makeClientAuthenticationMiddleware } from '@main/factories/middlewares/client/Authentication';

const routes = Router();

routes.post(
  '/',
  adaptMiddleware(makeClientAuthenticationMiddleware()),
  adaptRoute(makeCreateDeliveryController())
);

routes.get(
  '/',
  adaptMiddleware(makeClientAuthenticationMiddleware()),
  adaptRoute(makeFindAllDeliveriesFromClientController())
);

export default routes;
