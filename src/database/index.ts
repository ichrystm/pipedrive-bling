import mongoose from 'mongoose';
import Config from '../config';
import logger from '../utils/logger';
import messages from '../utils/messages';

class Database {
  authenticatedUrl: string;

  constructor() {
    this.authenticatedUrl = Config.databaseAuthenticatedUrl;
  }

  async connect() {
    mongoose.connect(this.authenticatedUrl)
      .then(() => logger.info(messages.databaseConnected))
      .catch((err) => {
        logger.error(`Database connection error: ${err}`);
        process.exit(1);
      });
  }
}

export default new Database();
