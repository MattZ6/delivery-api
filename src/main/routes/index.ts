import { Router } from 'express';

import clientRoutes from './client.routes';
import deliveryRoutes from './delivery.routes';
import deliverymanRoutes from './deliveryman.routes';

const routes = Router();

routes.use('/v1/clients', clientRoutes);
routes.use('/v1/deliverymans', deliverymanRoutes);

routes.use('/v1/deliveries', deliveryRoutes);

export default routes;
