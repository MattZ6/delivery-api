import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/routeAdapter';

import { makeCreateClientController } from '@main/factories/controllers/client/CreateClient';
import { makeAuthenticateClientController } from '@main/factories/controllers/client/Authenticate';

const routes = Router();

routes.post('/sign/in', adaptRoute(makeAuthenticateClientController()))
routes.post('/sign/up', adaptRoute(makeCreateClientController()));

export default routes;
