import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/routeAdapter';
import { makeAuthenticateDeliverymanController } from '@main/factories/controllers/deliveryman/Authenticate';
import { makeCreateDeliverymanController } from '@main/factories/controllers/deliveryman/Create';

const routes = Router();

routes.post('/sign/in', adaptRoute(makeAuthenticateDeliverymanController()));
routes.post('/sign/up', adaptRoute(makeCreateDeliverymanController()));

export default routes;
