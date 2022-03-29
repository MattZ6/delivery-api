import { config } from 'dotenv';

import { app } from '@main/config/app';

config();

app.listen(process.env.API_PORT, () => {
  console.log(`🍌 App is running at ${process.env.API_URL}:${process.env.API_PORT}`);
});
