import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/routeAdapter';

import { makeCreateClientController } from '@main/factories/controllers/client/CreateClient';

const routes = Router();

routes.post('/', adaptRoute(makeCreateClientController()));

export default routes;
