import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/routeAdapter';
import { makeCreateDeliverymanController } from '@main/factories/controllers/deliveryman/Create';

const routes = Router();

routes.post('/sign/up', adaptRoute(makeCreateDeliverymanController()));

export default routes;
