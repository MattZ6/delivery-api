import { config } from 'dotenv';

function setupEnv() {
  config();
}

async function startServer() {
  const { apiConfig } = await import('@main/config/env/api');
  const { app } = await import('@main/config/app');

  app.listen(apiConfig.PORT, () => {
    console.log(`🍌 App is running at ${apiConfig.URL}:${apiConfig.PORT}`);
  });
}

function initialize() {
  setupEnv();
  startServer();
}

initialize();
