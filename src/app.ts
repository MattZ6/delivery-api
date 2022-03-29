import express from 'express';

const app = express();

app.get('/', (_, res) => res.json({ message: '👋🌎' }));

export { app }
