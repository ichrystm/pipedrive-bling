import dotenv from 'dotenv';
import logger from '../utils/logger';
import messages from '../utils/messages';

dotenv.config();

class Config {
  serverPort: number;

  databaseAuthenticatedUrl: string;

  constructor() {
    if (!process.env.PORT) {
      logger.error(messages.readingEnvironmentVariablesError);
      process.exit(1);
    }

    if (!process.env.DATABASE_AUTHENTICATED_URL) {
      logger.error(messages.readingEnvironmentVariablesError);
      process.exit(1);
    }

    this.databaseAuthenticatedUrl = process.env.DATABASE_AUTHENTICATED_URL;
    this.serverPort = Number(process.env.PORT);
  }
}

export default new Config();
