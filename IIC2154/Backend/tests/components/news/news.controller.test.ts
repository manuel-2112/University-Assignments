import mongoose from 'mongoose';
import { afterAll, beforeAll, describe, it, expect, jest } from '@jest/globals';
import {
  createNews,
  readNewsById,
  readAllNews,
  readVisibleNews,
  readHiddenNews,
} from '../../../src/components/news/news.controller';
import {
  createMongoContainer,
  connect,
  closeConnection,
} from '../../../src/core/utils/create_container';
import mockData from '../../data/synthetic_news.json';

jest.setTimeout(60000);

let container: any;

beforeAll(async () => {
  const env = await createMongoContainer();
  container = env.container;
  process.env.DB_URL = env.mongoUrl;
  await connect();

  await Promise.all(
    mockData.map(async (news) => {
      const req: any = { body: news };
      const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
      await createNews(req, res);
    }),
  );
});

describe('News Controller', () => {
  it('should create a news item', async () => {
    const req: any = {
      body: {
        title: 'Test News',
        additionalInfo: 'This is a test news item',
      },
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await createNews(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'News item created successfully.',
        news: expect.objectContaining({
          title: 'Test News',
          additionalInfo: 'This is a test news item',
        }),
      }),
    );
  });

  it('should read all news', async () => {
    const req: any = {};
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await readAllNews(req, res);
    expect(res.send.mock.calls.length).toBe(1);
  });

  it('should read news by id', async () => {
    const req: any = { params: { id: '60f6c0e9c6f1f9b3c4b0f1b4' } };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await readNewsById(req, res);
    expect(res.send.mock.calls.length).toBe(1);
  });

  it('should read visible news', async () => {
    const req: any = {};
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await readVisibleNews(req, res);
    expect(res.send.mock.calls.length).toBe(1);
  });

  it('should read hidden news', async () => {
    const req: any = {};
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await readHiddenNews(req, res);
    expect(res.send.mock.calls.length).toBe(1);
  });
});

const closeMongooseConnection = async () => {
  await mongoose.disconnect();
};

afterAll(async () => {
  await closeMongooseConnection();
  await closeConnection(container);
});
