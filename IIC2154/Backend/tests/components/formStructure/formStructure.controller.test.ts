import mongoose from 'mongoose';
import {
  afterAll,
  beforeAll,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from '@jest/globals';
import {
  readCompanyFormStructure,
  createCompanyFormStructure,
  deleteCompanyFormStructure,
} from '../../../src/components/formStructure/formStructure.controller';
import { create as createCompany } from '../../../src/components/company/company.service';
import {
  createMongoContainer,
  connect,
  closeConnection,
} from '../../../src/core/utils/create_container';
import mockDataCompanies from '../../data/synthetic_companies.json';
import mockDataCompaniesFormStructure from '../../data/synthetic_form_structure.json';

jest.setTimeout(60000); // Increased to 1 minute

let container: any;
const companyIds = [];

beforeAll(async () => {
  const env = await createMongoContainer();
  container = env.container;
  process.env.DB_URL = env.mongoUrl;
  await connect();

  // Ensure all companies are created before proceeding
  await Promise.all(
    mockDataCompanies.map(async (company) => {
      const createdCompany = await createCompany(company);
      companyIds.push(createdCompany._id);
    }),
  );

  // Create form structure for mocked companies
  await Promise.all(
    mockDataCompaniesFormStructure.map(async (formStructure) => {
      const req: any = {
        body: formStructure,
        params: { company_id: companyIds[0] },
      };
      const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
      await createCompanyFormStructure(req, res);
    }),
  );
});

afterEach(async () => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 1000));
});

describe('FormStructure Controller', () => {
  it('should read a company form structure', async () => {
    const req: any = { params: { company_id: companyIds[0] } };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await readCompanyFormStructure(req, res);
    expect(res.send).toHaveBeenCalled();
  });

  it('should delete a company form structure', async () => {
    const req: any = { params: { company_id: companyIds[0] } };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await deleteCompanyFormStructure(req, res);
    expect(res.send).toHaveBeenCalled();
  });
});

const closeMongooseConnection = async () => {
  await mongoose.disconnect();
};

afterAll(async () => {
  await closeMongooseConnection();
  await closeConnection(container);
});
