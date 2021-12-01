import dotenv from 'dotenv';
import logger from '../utils/logger';
import messages from '../utils/messages';

dotenv.config();

class Config {
  serverPort: number;

  databaseAuthenticatedUrl: string;

  pipedriveApiUrl: string;

  pipedriveApiToken: string;

  blingApiUrl: string;

  blingApiToken: string;

  constructor() {
    if (!process.env.PORT) {
      logger.error(messages.readingEnvironmentVariablesError);
      process.exit(1);
    }

    if (!process.env.DATABASE_AUTHENTICATED_URL) {
      logger.error(messages.readingEnvironmentVariablesError);
      process.exit(1);
    }

    if (!process.env.PIPEDRIVE_API_URL) {
      logger.error(messages.readingEnvironmentVariablesError);
      process.exit(1);
    }

    if (!process.env.PIPEDRIVE_API_TOKEN) {
      logger.error(messages.readingEnvironmentVariablesError);
      process.exit(1);
    }

    if (!process.env.BLING_API_URL) {
      logger.error(messages.readingEnvironmentVariablesError);
      process.exit(1);
    }

    if (!process.env.BLING_API_TOKEN) {
      logger.error(messages.readingEnvironmentVariablesError);
      process.exit(1);
    }

    this.databaseAuthenticatedUrl = process.env.DATABASE_AUTHENTICATED_URL;
    this.serverPort = Number(process.env.PORT);
    this.pipedriveApiUrl = process.env.PIPEDRIVE_API_URL;
    this.pipedriveApiToken = process.env.PIPEDRIVE_API_TOKEN;
    this.blingApiUrl = process.env.BLING_API_URL;
    this.blingApiToken = process.env.BLING_API_TOKEN;
  }
}

export default new Config();
