import { Router } from 'express';

import clientRoutes from './client';
import deliverymanRoutes from './deliveryman';

const routes = Router();

routes.use('/v1/clients', clientRoutes);
routes.use('/v1/deliverymans', deliverymanRoutes);

export default routes;
