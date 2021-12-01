/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import Config from './config';
import logger from './utils/logger';
import Database from './database';

const app = express();

app.use(express.json());
app.use(cors);

const port = Config.serverPort;

Database.connect();

app.listen(port, () => {
  logger.info(`App running on port ${port}`);
});

export default app;
