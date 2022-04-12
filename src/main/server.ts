import { app } from './config/app';
import { apiConfig } from './config/env/api';

async function startServer() {
  app.listen(apiConfig.PORT, () => {
    console.log(`🍌 App is running at ${apiConfig.URL}:${apiConfig.PORT}`);
  });
}

startServer();
