import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middlewareAdapter';
import { adaptRoute } from '@main/adapters/express/routeAdapter';
import { makeCreateDeliveryController } from '@main/factories/controllers/delivery/Create';
import { makeFindAllAvailableDeliveriesController } from '@main/factories/controllers/delivery/FindAllAvailable';
import { makeStartDeliveryController } from '@main/factories/controllers/delivery/Start';
import { makeClientAuthenticationMiddleware } from '@main/factories/middlewares/client/Authentication';
import { makeDeliverymanAuthenticationMiddleware } from '@main/factories/middlewares/deliveryman/Authentication';

const routes = Router();

routes.post(
  '/',
  adaptMiddleware(makeClientAuthenticationMiddleware()),
  adaptRoute(makeCreateDeliveryController())
);

routes.get(
  '/available',
  adaptMiddleware(makeDeliverymanAuthenticationMiddleware()),
  adaptRoute(makeFindAllAvailableDeliveriesController())
);

routes.post(
  '/:delivery_id/start',
  adaptMiddleware(makeDeliverymanAuthenticationMiddleware()),
  adaptRoute(makeStartDeliveryController())
);

export default routes;
