import { Router } from 'express';

import clientRoutes from './client.routes';

const routes = Router();

routes.use('/v1/clients', clientRoutes);

export default routes;
