import { Router } from 'express';

import clientRoutes from './client.routes';
import deliverymanRoutes from './deliveryman.routes';

const routes = Router();

routes.use('/v1/clients', clientRoutes);
routes.use('/v1/deliverymans', deliverymanRoutes);

export default routes;
