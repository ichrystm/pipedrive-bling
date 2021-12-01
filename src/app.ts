/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import Config from './config';
import logger from './utils/logger';
import Database from './database';
import routes from './api/v1/routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const port = Config.serverPort;

Database.connect();

app.listen(port, () => {
  logger.info(`App running on port ${port}`);
});

export default app;
