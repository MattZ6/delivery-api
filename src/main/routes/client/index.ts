import { Router } from 'express';

import authRoutes from './auth.routes';
import deliveryRoutes from './delivery.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/me/deliveries', deliveryRoutes);

export default routes;
