import { Router } from 'express';

import { adaptMiddleware } from '@main/adapters/express/middlewareAdapter';
import { adaptRoute } from '@main/adapters/express/routeAdapter';
import { makeFindAllAvailableDeliveriesController } from '@main/factories/controllers/delivery/FindAllAvailable';
import { makeStartDeliveryController } from '@main/factories/controllers/delivery/Start';
import { makeDeliverymanAuthenticationMiddleware } from '@main/factories/middlewares/deliveryman/Authentication';

const routes = Router();

routes.get(
  '/deliveries/available',
  adaptMiddleware(makeDeliverymanAuthenticationMiddleware()),
  adaptRoute(makeFindAllAvailableDeliveriesController())
);

routes.post(
  '/deliveries/:delivery_id/start',
  adaptMiddleware(makeDeliverymanAuthenticationMiddleware()),
  adaptRoute(makeStartDeliveryController())
);

export default routes;
