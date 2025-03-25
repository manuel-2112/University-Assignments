import mongoose from 'mongoose';
import { afterAll, beforeAll, describe, it, expect, jest } from '@jest/globals';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { unauthorizedCompany } from '@components/authentication/auth.company';
import {
  createFormData,
  readFormData,
  getAllFormData,
  getCompanyFormsData,
} from '../../../src/components/formData/formData.controller';
import { IFormData } from '../../../src/components/formData/formData.interface';
import { IFormStructure } from '../../../src/components/formStructure/formStructure.interface';
import {
  createMongoContainer,
  connect,
  closeConnection,
} from '../../../src/core/utils/create_container';
import { readFormStructure } from '../../../src/components/formStructure/formStructure.service';
import {
  create,
  read,
  getAll,
  getFormsData,
} from '../../../src/components/formData/formData.service';

jest.mock(
  '../../../src/components/formStructure/formStructure.service',
  () => ({
    readFormStructure: jest.fn(),
  }),
);

jest.mock('../../../src/components/formData/formData.service', () => ({
  create: jest.fn(),
  read: jest.fn(),
  getAll: jest.fn(),
  getFormsData: jest.fn(),
}));

jest.mock('@components/authentication/auth.company', () => ({
  unauthorizedCompany: jest.fn(),
}));

jest.setTimeout(60000); // Increase to 1 minute

const mockRequest = (overrides = {}): Request => {
  const req: any = {
    params: {},
    query: {},
    body: {},
    ...overrides,
  };
  return req as Request;
};

// Mock response object
const mockResponse = (): Response => {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  };
  return res as Response;
};

export { mockRequest, mockResponse };

let container: any;

const formStructure: IFormStructure = {
  name: true,
  email: true,
  phone: true,
  service: true,
  text: true,
};

const mockFormData: IFormData = {
  _id: '507f191e810c19729de860ea',
  companyId: '507f191e810c19729de860eb',
  name: 'Alice Johnson',
  email: 'alice.johnson@example.com',
  phone: '555-123-4567',
  service: 'Web Development',
  text: 'A detailed description about the project.',
};

const mockFormsData = [
  {
    _id: '1',
    companyId: '507f191e810c19729de860eb',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-987-6543',
    service: 'Mobile App Development',
    text: 'Looking for a mobile app to streamline our business operations.',
  },
  {
    _id: '2',
    companyId: '507f191e810c19729de860eb',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '555-555-5555',
    service: 'Graphic Design',
    text: 'In need of a new logo and branding materials for our upcoming event.',
  },
  {
    _id: '3',
    companyId: '507f191e810c19729de860ed',
    name: 'Alex Brown',
    email: 'alex.brown@example.com',
    phone: '555-123-4567',
    service: 'Web Development',
    text: 'Looking to revamp our website with modern design and features.',
  },
  {
    _id: '4',
    companyId: '507f191e810c19729de860ee',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    phone: '555-222-3333',
    service: 'SEO Optimization',
    text: "Need assistance in improving our website's search engine rankings.",
  },
  {
    _id: '5',
    companyId: '507f191e810c19729de860ef',
    name: 'Michael Williams',
    email: 'michael.williams@example.com',
    phone: '555-777-8888',
    service: 'Social Media Marketing',
    text: 'Seeking help in creating engaging social media content for our brand.',
  },
];

beforeAll(async () => {
  const env = await createMongoContainer();
  container = env.container;
  process.env.DB_URL = env.mongoUrl;
  await connect();
});

describe('createFormData Controller', () => {
  it('should create a new form data and return it', async () => {
    const req = mockRequest({
      body: {
        ...mockFormData,
      },
      params: {
        company_id: mockFormData.companyId,
      },
    });
    const res = mockResponse();

    // Mock the readFormStructure and create functions
    (
      readFormStructure as jest.MockedFunction<typeof readFormStructure>
    ).mockResolvedValue(formStructure);
    (create as jest.MockedFunction<typeof create>).mockResolvedValue(
      mockFormData,
    );

    await createFormData(req, res);

    // Check status and response
    expect(readFormStructure).toHaveBeenCalledWith(mockFormData.companyId);
    expect(create).toHaveBeenCalledWith(mockFormData, formStructure);
    expect(unauthorizedCompany).toHaveBeenCalledWith(req, res);
    expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
    expect(res.send).toHaveBeenCalledWith({
      formData: mockFormData,
      message: 'The form was created succesfully',
    });
  });

  it('should return 500 if an error occurs', async () => {
    const req = mockRequest({
      body: {
        ...mockFormData,
      },
      params: {
        company_id: mockFormData.companyId,
      },
    });
    const res = mockResponse();

    // Mock an error in the readFormStructure function
    (
      readFormStructure as jest.MockedFunction<typeof readFormStructure>
    ).mockRejectedValue(new Error('Form structure not found'));

    await createFormData(req, res);

    expect(readFormStructure).toHaveBeenCalledWith(mockFormData.companyId);
    expect(res.status).toHaveBeenCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith('Form structure not found');
  });
});

describe('readFormData Controller', () => {
  it('should read form data and return it', async () => {
    const req = mockRequest({
      params: {
        form_data_id: mockFormData._id,
      },
    });
    const res = mockResponse();

    (read as jest.MockedFunction<typeof read>).mockResolvedValue(mockFormData);

    await readFormData(req, res);

    expect(read).toHaveBeenCalledWith(mockFormData._id);
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.send).toHaveBeenCalledWith({ formData: mockFormData });
  });

  it('should return 500 if an error occurs', async () => {
    const formDataId = '507f191e810c19729de860ea';
    const errorMessage = 'Internal server error';

    const req = mockRequest({
      params: {
        form_data_id: formDataId,
      },
    });
    const res = mockResponse();

    (read as jest.MockedFunction<typeof read>).mockRejectedValue(
      new Error(errorMessage),
    );

    await readFormData(req, res);

    expect(read).toHaveBeenCalledWith(formDataId);
    expect(res.status).toHaveBeenCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith(errorMessage);
  });
});

describe('getAllFormData Controller', () => {
  it('should get all form data and return it', async () => {
    const req = mockRequest();
    const res = mockResponse();

    (getAll as jest.MockedFunction<typeof getAll>).mockResolvedValue(
      mockFormsData,
    );

    await getAllFormData(req, res);

    expect(getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    expect(res.json).toHaveBeenCalledWith({ formData: mockFormsData });
  });

  it('should return 500 if an error occurs', async () => {
    const errorMessage = 'Internal server error';

    const req = mockRequest();
    const res = mockResponse();

    (getAll as jest.MockedFunction<typeof getAll>).mockRejectedValue(
      new Error(errorMessage),
    );

    await getAllFormData(req, res);

    expect(getAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith(errorMessage);
  });
});

describe('getCompanyFormsData Controller', () => {
  it('should get form data for a company and return it', async () => {
    const companyId = '507f191e810c19729de860eb';
    const mockCompanyFormsData = [
      {
        _id: '1',
        companyId: '507f191e810c19729de860eb',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '555-987-6543',
        service: 'Mobile App Development',
        text: 'Looking for a mobile app to streamline our business operations.',
      },
      {
        _id: '2',
        companyId: '507f191e810c19729de860eb',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '555-555-5555',
        service: 'Graphic Design',
        text: 'In need of a new logo and branding materials for our upcoming event.',
      },
    ];

    const req = mockRequest({
      params: {
        company_id: companyId,
      },
    });
    const res = mockResponse();

    (
      getFormsData as jest.MockedFunction<typeof getFormsData>
    ).mockResolvedValue(mockCompanyFormsData);

    await getCompanyFormsData(req, res);

    expect(getFormsData).toHaveBeenCalledWith(companyId);
    expect(res.status).toHaveBeenCalledWith(httpStatus.ACCEPTED);
    expect(res.send).toHaveBeenCalledWith({ formData: mockCompanyFormsData });
  });

  it('should return 500 if an error occurs', async () => {
    const companyId = '507f191e810c19729de860eb';
    const errorMessage = 'Internal server error';

    const req = mockRequest({
      params: {
        company_id: companyId,
      },
    });
    const res = mockResponse();

    (
      getFormsData as jest.MockedFunction<typeof getFormsData>
    ).mockRejectedValue(new Error(errorMessage));

    await getCompanyFormsData(req, res);

    expect(getFormsData).toHaveBeenCalledWith(companyId);
    expect(res.status).toHaveBeenCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith(errorMessage);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await closeConnection(container);
});
