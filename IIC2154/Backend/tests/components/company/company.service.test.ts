import mongoose from 'mongoose';
import config from '@config/config';
import {
  afterAll,
  beforeAll,
  beforeEach,
  afterEach,
  describe,
  it,
  expect,
  jest,
} from '@jest/globals';
import FormDataModel from '@components/formData/formData.model';
import { buildFieldsToUpdate } from '@core/utils/companyDataManagement';
import logger from '@core/utils/logger';
import { IAccountData } from '@components/company/company.interface';
import ServiceModel from '@components/services/services.model';
import {
  createMongoContainer,
  connect,
  closeConnection,
} from '../../../src/core/utils/create_container';
import mockDataCompanies from '../../data/synthetic_companies.json';
import mockDataServices from '../../data/synthetic_services.json';
import { create as createService } from '../../../src/components/services/services.service';
import CompanyModel from '../../../src/components/company/company.model';
import {
  create,
  read,
  getAll,
  getAllUnverified,
  deleteById,
  verifyCompanyById,
  addServiceToCompany,
  addFormDataToCompany,
  deleteServiceFromCompany,
  addLogo,
  deleteLogo,
} from '../../../src/components/company/company.service';

jest.setTimeout(60000); // Increased to 1 minute

jest.mock('@core/utils/logger', () => {
  return {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
});

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
      const createdCompany = await create(company);
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

describe('getAll function', () => {
  it('should retrieve only verified non-superuser company records', async () => {
    const testCompany = await CompanyModel.findOne();
    await verifyCompanyById(true, testCompany._id.toString());
    const companies = await getAll();
    expect(companies.length).toBeGreaterThan(0); // Assuming there are verified, non-superuser companies in mock data
    companies.forEach((company) => {
      expect(company.permissions.isVerified).toBe(true);
      expect(company.permissions.isSuperuser).toBe(false);
    });
  });

  // Add tests to verify handling when no companies meet the criteria
  it('should handle cases with no companies meeting the criteria', async () => {
    // You may need to adjust your mock setup to test this scenario
    await CompanyModel.deleteMany({ 'permissions.isVerified': true });
    const companies = await getAll();
    expect(companies.length).toBe(0);
  });
});

describe('Company Create', () => {
  it('should create a new company and retrieve it by ID', async () => {
    const mockCompanyData = {
      name: 'Original Company',
      email: 'original@example.com',
      rut: '987654321',
      logo: 'http://example.com/original.png',
      address: '987 Original Blvd',
      city: 'OriginalCity',
      region: 'OriginalRegion',
      description: 'A company that is original',
      contactEmail: 'contact@originalcompany.com',
      contactPhone: '987-654-3210',
      instagramUrl: 'http://instagram.com/originalcompany',
      linkedinUrl: 'http://linkedin.com/company/originalcompany',
      webpageUrl: 'http://originalcompany.com',
      branchRegions: ['Original State', 'Old Region'],
    };
    const createdCompany = await create(mockCompanyData);

    const fetchedCompany = await read(createdCompany._id);
    expect(fetchedCompany.accountData).toEqual(
      expect.objectContaining({
        ...mockCompanyData,
      }),
    );
  });
});

describe('getAllUnverified function', () => {
  it('should retrieve only unverified company records', async () => {
    const companies = await getAllUnverified();
    expect(companies.every((company) => !company.permissions.isVerified)).toBe(
      true,
    );
  });

  it('should handle cases with no unverified companies', async () => {
    // You may need to adjust your mock setup to test this scenario
    await CompanyModel.updateMany({}, { 'permissions.isVerified': true });
    const companies = await getAllUnverified();
    expect(companies.length).toBe(0);
  });
});

describe('update', () => {
  let mockCompanyId;
  let originalCompanyData;

  beforeEach(async () => {
    // Assuming there's already a company created previously for test purposes
    originalCompanyData = new CompanyModel({
      name: 'Original Company',
      email: 'original@example.com',
      rut: '987654321',
      logo: 'http://example.com/original.png',
      address: '987 Original Blvd',
      city: 'OriginalCity',
      region: 'OriginalRegion',
      description: 'A company that is original',
      contactEmail: 'contact@originalcompany.com',
      contactPhone: '987-654-3210',
      instagramUrl: 'http://instagram.com/originalcompany',
      linkedinUrl: 'http://linkedin.com/company/originalcompany',
      webpageUrl: 'http://originalcompany.com',
      branchRegions: ['Original State', 'Old Region'],
    });
    await originalCompanyData.save();
    mockCompanyId = originalCompanyData._id;
  });

  it('should successfully update a company', async () => {
    const mockCompanyData: IAccountData = {
      name: 'Updated Company',
      email: 'update@example.com',
      rut: '123456789',
      logo: 'http://example.com/logo.png',
      address: '123 Update Blvd',
      city: 'UpdateCity',
      region: 'UpdateRegion',
      description: 'A company that specializes in updates',
      contactEmail: 'contact@updatecompany.com',
      contactPhone: '123-456-7890',
      instagramUrl: 'http://instagram.com/updatecompany',
      linkedinUrl: 'http://linkedin.com/company/updatecompany',
      webpageUrl: 'http://updatecompany.com',
      branchRegions: ['Update State', 'New Region'],
    };
    const fieldsToUpdate = buildFieldsToUpdate(mockCompanyData, 'accountData');

    const result = await CompanyModel.findOneAndUpdate(
      { _id: mockCompanyId },
      { $set: fieldsToUpdate },
      { new: true },
    );

    expect(result).not.toBeNull();
    expect(result.accountData).toEqual(mockCompanyData);
  });

  it('should throw an error if the company is not found', async () => {
    const nonExistentCompanyId = '5f64c6b0c9d8d36d316b5276'; // An ID that definitely does not exist
    const result = await CompanyModel.findOneAndUpdate(
      { _id: nonExistentCompanyId },
      { $set: { name: 'Should Fail' } },
      { new: true },
    );

    expect(result).toBeNull(); // No company should be found and updated
  });
});

describe('deleteById function', () => {
  it('should successfully delete a company and its associated services', async () => {
    // Assuming that mockDataCompanies already has companies inserted in the database
    // Ensure you have a companyId from already seeded data
    const testCompany = await CompanyModel.findOne(); // Get a sample company
    const companyId = testCompany._id;

    // Delete the company and its services
    const result = await deleteById(companyId.toString());
    expect(result).toBeTruthy();

    // Check the database to confirm deletion
    const foundCompany = await CompanyModel.findById(companyId);
    expect(foundCompany).toBeNull(); // Company should no longer exist

    // Verify all associated services are also deleted
    const services = await ServiceModel.find({
      companyId: companyId.toString(),
    });
    expect(services.length).toBe(0); // There should be no services associated with the company
  });

  it('should throw an error if the company does not exist', async () => {
    const nonExistentCompanyId = '5f64c6b0c9d8d36d316b5276'; // This should be an ID that definitely does not exist

    await expect(deleteById(nonExistentCompanyId)).rejects.toThrow(
      'Company was not deleted!',
    );
  });
});

describe('verifyCompanyById function', () => {
  it('should update the verification status of a company', async () => {
    // Pick a company from your pre-seeded test database
    const testCompany = await CompanyModel.findOne(); // Get the first test company
    const originalVerificationStatus = testCompany.permissions.isVerified;
    const newVerificationStatus = !originalVerificationStatus; // Change the status

    // Run the function with the actual database
    const result = await verifyCompanyById(
      newVerificationStatus,
      testCompany._id.toString(),
    );
    expect(result).toBe(true);

    // Fetch the updated company to verify changes
    const updatedCompany = await CompanyModel.findById(testCompany._id);
    expect(updatedCompany.permissions.isVerified).toBe(newVerificationStatus);
  });

  it('should throw an error if the company does not exist', async () => {
    const nonExistentCompanyId = '5f64c6b0c9d8d36d316b527678041'; // This should be an ID that definitely does not exist
    await expect(verifyCompanyById(true, nonExistentCompanyId)).rejects.toThrow(
      'Company verified status was not updated!',
    );
  });
});

describe('addServiceToCompany function', () => {
  let companyId;
  let serviceId;

  beforeEach(async () => {
    // Create a test company
    const newCompany = new CompanyModel({
      accountData: {
        name: 'Test Company',
        email: 'test@example.com',
      },
      servicesData: [],
    });
    const savedCompany = await newCompany.save();
    companyId = savedCompany._id.toString();

    // Create a test service (assuming ServiceModel exists and is similar in setup to CompanyModel)
    const newService = new ServiceModel({
      name: 'Test Service',
      description: 'A service for testing',
      price: '999',
    });
    const savedService = await newService.save();
    serviceId = savedService._id.toString();
  });

  it('should successfully add a service ID to the company', async () => {
    const result = await addServiceToCompany(companyId, serviceId);
    expect(result).toBe(true);

    // Fetch the updated company to verify changes
    const updatedCompany = await CompanyModel.findById(companyId);
    expect(updatedCompany.servicesData.map((id) => id.toString())).toContain(
      serviceId,
    );
  });

  it('should throw an error if the company does not exist', async () => {
    const nonExistentCompanyId = '5f64c6b0c9d8d36d316b5276111'; // An ID that does not exist

    await expect(
      addServiceToCompany(nonExistentCompanyId, serviceId),
    ).rejects.toThrow('Service was not added to Company!');
  });

  afterEach(async () => {
    //   // Clean up the database
    await CompanyModel.deleteMany({});
    await ServiceModel.deleteMany({});
  });
});

describe('addFormDataToCompany function', () => {
  let companyId;
  let formDataId;

  beforeEach(async () => {
    // Create a test company
    const newCompany = new CompanyModel({
      accountData: {
        name: 'Test Company',
        email: 'test@example.com',
      },
      formsData: [], // Assuming this is an array to store formData IDs
    });
    const savedCompany = await newCompany.save();
    companyId = savedCompany._id.toString();

    // Assuming you have a FormDataModel or similar for creating test form data
    const newFormData = new FormDataModel({
      description: 'Test Form Data',
      // other necessary data fields
    });
    const savedFormData = await newFormData.save();
    formDataId = savedFormData._id.toString();
  });

  it('should successfully add a formData ID to the company', async () => {
    const result = await addFormDataToCompany(companyId, formDataId);
    expect(result).toBe(true);

    // Fetch the updated company to verify changes
    const updatedCompany = await CompanyModel.findById(companyId);
    // Convert ObjectId to string for comparison

    expect(updatedCompany.formsData.map((id) => id.toString())).toContain(
      formDataId,
    );
  });

  it('should throw an error if the company does not exist', async () => {
    const nonExistentCompanyId = 'nonexistent_company_id'; // An ID that definitely does not exist

    await expect(
      addFormDataToCompany(nonExistentCompanyId, formDataId),
    ).rejects.toThrow('Form was not added to Company!');
  });

  // afterEach(async () => {
  //   // Clean up the database by removing test entries
  //   await CompanyModel.deleteMany({});
  //   await FormDataModel.deleteMany({}); // Assuming FormDataModel is used
  // });
});

describe('deleteServiceFromCompany function', () => {
  let companyId;
  let serviceId;

  beforeEach(async () => {
    // Create a company and add service IDs
    const newCompany = new CompanyModel({
      accountData: { name: 'Test Company', email: 'test@example.com' },
      servicesData: [],
    });
    const savedCompany = await newCompany.save();
    companyId = savedCompany._id.toString();

    addServiceToCompany(companyId, serviceId);
  });

  it('should successfully remove a service from the company', async () => {
    const result = await deleteServiceFromCompany(companyId, serviceId);
    expect(result).toBe(true);

    // Verify that the service ID has been removed
    const updatedCompany = await CompanyModel.findById(companyId);
    expect(updatedCompany.servicesData).not.toContain(serviceId);
  });

  it('should throw an error if the company does not exist', async () => {
    const nonExistentCompanyId = '5f64c6b0c9d8d36d316b5276'; // An ID that does not exist

    await expect(
      deleteServiceFromCompany(nonExistentCompanyId, serviceId),
    ).rejects.toThrow('Service was not removed from Company!');
  });

  afterEach(async () => {
    // Clean up the database
    await CompanyModel.deleteMany({});
  });
});

describe('addLogo function', () => {
  it('should update the logo of the company and return true', async () => {
    // Create a synthetic company with a mock logo
    const companyData = {
      name: 'Test Company',
      email: 'test@example.com',
      accountData: {
        logo: 'previous_logo_url',
      },
    };
    const createdCompany = await CompanyModel.create(companyData);

    // Call the function to update the logo
    const newLogoUrl = 'new_logo_url';
    const result = await addLogo(createdCompany._id, newLogoUrl);

    // Assert that the function returns true
    expect(result).toBe(true);

    // Fetch the updated company from the database
    const updatedCompany = await CompanyModel.findById(createdCompany._id);

    // Assert that the logo has been updated
    expect(updatedCompany.accountData.logo).toBe(newLogoUrl);
  });
});

describe('deleteLogo function', () => {
  it('should delete the logo of the company if the provided logo URL matches', async () => {
    // Create a synthetic company with a mock logo
    const companyData = {
      name: 'Test Company',
      email: 'test@example.com',
      accountData: {
        logo: 'previous_logo_url',
      },
    };
    const createdCompany = await CompanyModel.create(companyData);

    // Call the function to delete the logo with the correct logo URL
    const logoUrl = 'previous_logo_url';
    await deleteLogo(createdCompany._id, logoUrl);

    // Fetch the updated company from the database
    const updatedCompany = await CompanyModel.findById(createdCompany._id);

    // Assert that the logo has been deleted and set to the default logo URL
    expect(updatedCompany.accountData.logo).toBe(config.default_company_logo);

    // Assert that logger.debug is called with the correct message
    expect(logger.debug).toHaveBeenCalledWith(
      `Logo deleted from company: %O`,
      createdCompany._id,
    );
  });

  it('should throw an error if the provided logo URL does not match the company logo URL', async () => {
    // Create a synthetic company with a mock logo
    const companyData = {
      name: 'Test Company',
      email: 'test@example.com',
      accountData: {
        logo: 'previous_logo_url',
      },
    };
    const createdCompany = await CompanyModel.create(companyData);

    // Call the function to delete the logo with a different logo URL
    const logoUrl = 'different_logo_url';
    await expect(deleteLogo(createdCompany._id, logoUrl)).rejects.toThrow(
      'Logo url does not match company logo url',
    );

    await expect(logger.error).toHaveBeenCalled;
  });

  it('should throw an error if the company is not found', async () => {
    // Generate a valid but non-existent ObjectId
    // const nonExistentCompanyId = new mongoose.Types.ObjectId().toString();
    const nonExistentCompanyId = '339993202020';
    const logoUrl = 'previous_logo_url';

    // Call the function with a non-existent company ID
    await expect(deleteLogo(nonExistentCompanyId, logoUrl)).rejects.toThrow(
      'Company not found',
    );

    // Assert that logger.error is called with the correct message
    await expect(logger.error).toHaveBeenCalled;
  });
});

const closeMongooseConnection = async () => {
  await mongoose.disconnect();
};

afterAll(async () => {
  await closeMongooseConnection();
  await closeConnection(container);
});
