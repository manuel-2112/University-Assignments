import mongoose from 'mongoose';
import { afterAll, beforeAll, describe, it, expect, jest } from '@jest/globals';
import {
  createService,
  readService,
  getAllServices,
  deleteService,
  getCompanyServices,
} from '../../../src/components/services/services.controller';
import {
  createMongoContainer,
  connect,
  closeConnection,
} from '../../../src/core/utils/create_container';
import mockDataServices from '../../data/synthetic_services.json';
import mockDataCompanies from '../../data/synthetic_companies.json';
import { create as createCompany } from '../../../src/components/company/company.service';
import { create as createsService } from '../../../src/components/services/services.service';

jest.setTimeout(60000);

let container: any;
const companyIds = [];

beforeAll(async () => {
  const env = await createMongoContainer();
  container = env.container;
  process.env.DB_URL = env.mongoUrl;
  await connect();
  mockDataCompanies.map(async (company) => {
    const createdCompany = await createCompany(company);
    companyIds.push(createdCompany._id);
  });

  await Promise.all(
    mockDataServices.map(async (service, index) => {
      const companyIdIndex = index % companyIds.length;
      const serviceWithCompanyId = {
        ...service,
        // eslint-disable-next-line security/detect-object-injection
        companyId: companyIds[companyIdIndex],
      };
      await createsService(serviceWithCompanyId);
    }),
  );
});

describe('Services Controller', () => {
  it('should create a new service', async () => {
    const mockServiceData = {
      name: 'Test Service',
      description: 'This is a test service',
      imageLink: ['https://test.com/image'],
      price: '100',
      category: ['Test'],
    };
    const req: any = {
      body: mockServiceData,
      params: { companyId: companyIds[0] },
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await createService(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'The service was created succesfully',
        service: expect.objectContaining(mockServiceData),
      }),
    );
  });

  it('should read a service by id', async () => {
    const req: any = { params: { id: '60f6c0e9c6f1f9b3c4b0f1b4' } };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await readService(req, res);
    expect(res.send.mock.calls.length).toBe(1);
  });

  it('should read all services', async () => {
    const req: any = {};
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await getAllServices(req, res);
    expect(res.send.mock.calls.length).toBe(1);
  });

  it('should delete a service', async () => {
    const req: any = { params: { id: '60f6c0e9c6f1f9b3c4b0f1b4' } };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await deleteService(req, res);
    expect(res.send.mock.calls.length).toBe(1);
  });

  it('should get all services for a company', async () => {
    const req: any = { params: { companyId: companyIds[0] } };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await getCompanyServices(req, res);
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
