import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/routeAdapter';
import { makeAuthenticateClientController } from '@main/factories/controllers/client/Authenticate';
import { makeCreateClientController } from '@main/factories/controllers/client/Create';
import { makeRefreshClientAccessTokenController } from '@main/factories/controllers/client/RefreshAccessToken';

const routes = Router();

routes.post('/sign/in', adaptRoute(makeAuthenticateClientController()));
routes.post('/sign/up', adaptRoute(makeCreateClientController()));
routes.post('/refresh', adaptRoute(makeRefreshClientAccessTokenController()));

export default routes;
