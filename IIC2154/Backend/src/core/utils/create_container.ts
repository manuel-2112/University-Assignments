import { GenericContainer, StartedTestContainer } from 'testcontainers';
import mongoose from 'mongoose';
import logger from '@core/utils/logger';

const createMongoContainer = async () => {
  try {
    logger.info('Creating mongo container');
    const container = await new GenericContainer('mongo:latest')
      .withExposedPorts(27017)
      .start();
    const mongoUrl = `mongodb://localhost:${container.getMappedPort(27017)}`;
    logger.info('Mongo container created');
    return { container, mongoUrl };
  } catch (err) {
    logger.error(`Error while setting up mongo container: ${err.message}`);
    throw err;
  }
};

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    logger.info('Connected to MongoDB!');
  } catch (err) {
    logger.error(`MongoDB connection error: ${err.message}`);
    throw err;
  }
};

const closeConnection = async (container: StartedTestContainer) => {
  try {
    await container.stop();
    logger.info('Mongo container stopped successfully.');
  } catch (error) {
    logger.error(`Error stopping mongo container: ${error.message}`);
    throw error;
  }
};

export { createMongoContainer, closeConnection, connect };
