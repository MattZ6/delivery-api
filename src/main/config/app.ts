import express from 'express';

import routes from '@main/routes';

import setupSwagger from './swagger';

const app = express();

app.use(express.json());
app.use(routes);

setupSwagger(app);

export { app };
