import mongoose from 'mongoose';
import { afterAll, beforeAll, describe, it, expect, jest } from '@jest/globals';
import {
  searchCompanies,
  searchServices,
  search,
} from '../../../src/components/search/search.controller';
import { create as createCompany } from '../../../src/components/company/company.service';
import { create as createService } from '../../../src/components/services/services.service';
import {
  createMongoContainer,
  connect,
  closeConnection,
} from '../../../src/core/utils/create_container';
import mockDataCompanies from '../../data/synthetic_companies.json';
import mockDataServices from '../../data/synthetic_services.json';

jest.setTimeout(60000); // Increased to 1 minute

let container: any;

beforeAll(async () => {
  const env = await createMongoContainer();
  container = env.container;
  process.env.DB_URL = env.mongoUrl;
  await connect();

  const companyIds = [];

  // Create companies and collect their IDs
  await Promise.all(
    mockDataCompanies.map(async (company) => {
      const createdCompany = await createCompany(company);
      companyIds.push(createdCompany._id);
    }),
  );

  // Create services and ensure each service has a companyId property
  await Promise.all(
    mockDataServices.map(async (service) => {
      const serviceWithCompanyId = {
        ...service,
        companyId: companyIds[Math.floor(Math.random() * companyIds.length)],
      };
      await createService(serviceWithCompanyId);
    }),
  );
});

describe('Search Companies and Services', () => {
  it('should return the correct companies based on the query', async () => {
    const req: any = {
      query: { q: 'solucion automatizada para regar mis plantas' },
    };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    await searchCompanies(req, res);
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        companies: expect.arrayContaining([
          expect.objectContaining({
            accountData: expect.objectContaining({ name: 'Viveros del Valle' }),
          }),
          expect.objectContaining({
            accountData: expect.objectContaining({
              name: 'Agroindustria Campo Verde',
            }),
          }),
          expect.objectContaining({
            accountData: expect.objectContaining({
              name: 'Maquinaria Agrícola Innovadora',
            }),
          }),
        ]),
      }),
    );
  });

  it('should return the correct services based on the query', async () => {
    const req: any = { query: { q: 'drone clima software' } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    await searchServices(req, res);
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        services: expect.arrayContaining([
          expect.objectContaining({ name: 'Servicios de Drones Agrícolas' }),
          expect.objectContaining({
            name: 'Controladores de Riego Inteligentes',
          }),
          expect.objectContaining({
            name: 'Software de Agricultura de Precisión',
          }),
        ]),
      }),
    );
  });

  it('Should return the correct services and companies based on the query', async () => {
    const req: any = { query: { q: 'drone regar plantas' } };
    const res: any = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await search(req, res);
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        services: expect.arrayContaining([
          expect.objectContaining({ name: 'Servicios de Drones Agrícolas' }),
        ]),
      }),
    );
  });
});

const closeMongooseConnection = async () => {
  await mongoose.disconnect();
};

afterAll(async () => {
  await closeMongooseConnection();
  await closeConnection(container);
});
