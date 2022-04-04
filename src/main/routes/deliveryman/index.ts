import { Router } from 'express';

import authRoutes from './auth.routes';
import deliveryRoutes from './delivery.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/', deliveryRoutes);

export default routes;
