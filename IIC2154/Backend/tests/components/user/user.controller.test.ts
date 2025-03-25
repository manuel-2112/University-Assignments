import mongoose from 'mongoose';
import { afterAll, beforeAll, describe, it, expect, jest } from '@jest/globals';
import { IUser } from '@components/user/user.interface';
import {
  createUser,
  getUserFavoriteCompanies,
  addCompanyToUserFavorites,
  removeCompanyToUserFavorites,
  getUser,
  createPotentialUser,
  getPotentialUsers,
  updateUserDisplayData,
  updateUserStatus,
} from '../../../src/components/user/user.controller';
import {
  createMongoContainer,
  connect,
  closeConnection,
} from '../../../src/core/utils/create_container';
import mockDataCompanies from '../../data/synthetic_companies.json';
import mockDataUsers from '../../data/synthetic_users.json';
import { create as createCompany } from '../../../src/components/company/company.service';
import {
  create as createUserFromService,
  addFavoriteCompany,
} from '../../../src/components/user/user.service';

jest.setTimeout(120000);

let container: any;
let firstMockCompanyId: string;
let secondMockCompanyId: string;
let thirdMockCompanyId: string;
const mockUserId: string = 'mock_test';

beforeAll(async () => {
  const env = await createMongoContainer();
  container = env.container;
  process.env.DB_URL = env.mongoUrl;
  await connect();

  // Create Mock Companies
  const firstMockCompany = await createCompany(mockDataCompanies[0]);
  firstMockCompanyId = firstMockCompany._id;
  const secondMockCompany = await createCompany(mockDataCompanies[1]);
  secondMockCompanyId = secondMockCompany._id;
  const thirdMockCompany = await createCompany(mockDataCompanies[2]);
  thirdMockCompanyId = thirdMockCompany._id;

  // Create Mock User
  await createUserFromService({ user_id: mockUserId } as IUser);

  // Add Mock Company To Mock User Favorites
  await addFavoriteCompany(mockUserId, firstMockCompanyId);
  await addFavoriteCompany(mockUserId, thirdMockCompanyId);

  // Create Potential User Mocks
  await Promise.all(
    mockDataUsers.map(async (user) => {
      await createUserFromService(user as IUser);
    }),
  );
});

describe('User Controller', () => {
  it('should create a user', async () => {
    const req: any = {
      body: {
        user_id: 'test_user_id',
      },
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await createUser(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'User was created successfully',
        user: expect.objectContaining({
          user_id: 'test_user_id',
        }),
      }),
    );
  });

  it('should fetch users favorites', async () => {
    const req: any = { params: { user_id: mockUserId } };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await getUserFavoriteCompanies(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          _id: firstMockCompanyId,
        }),
        expect.objectContaining({
          _id: thirdMockCompanyId,
        }),
      ]),
    );
  });

  it('should add company to user favorites', async () => {
    const req: any = {
      params: {
        user_id: mockUserId,
        company_id: secondMockCompanyId,
      },
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await addCompanyToUserFavorites(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Added Favorite Company',
      }),
    );
  });

  it('should delete company from user favorites', async () => {
    const req: any = {
      params: {
        user_id: mockUserId,
        company_id: thirdMockCompanyId,
      },
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await removeCompanyToUserFavorites(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Removed Favorite Company',
      }),
    );
  });

  it('should fetch user using user_id', async () => {
    const req: any = {
      params: {
        user_id: mockUserId,
      },
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await getUser(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: mockUserId,
      }),
    );
  });

  it('should create potential user flow', async () => {
    const req: any = {
      params: {
        user_id: 'no_status',
      },
      body: {
        role: 'Sponsor',
        displayData: {
          name: 'name',
          email: 'email@email.com',
          number: '56999994444',
        },
      },
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await createPotentialUser(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'no_status',
        role: 'Sponsor',
      }),
    );
  });

  it('should fetch all potential users', async () => {
    const req: any = {};
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await getPotentialUsers(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          status: 'Pending',
          user_id: 'pending_status',
        }),
        expect.objectContaining({
          status: 'Pending',
          user_id: 'no_status',
        }),
        expect.objectContaining({
          status: 'Pending',
          user_id: 'accepted_user',
        }),
      ]),
    );
  });

  it('should update display data', async () => {
    const req: any = {
      params: {
        user_id: 'pending_status',
      },
      body: {
        displayData: {
          name: 'TESTINGNAME',
          email: 'email@email.com',
          number: '56999994444',
        },
      },
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await updateUserDisplayData(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'pending_status',
        displayData: expect.objectContaining({
          name: 'TESTINGNAME',
        }),
      }),
    );
  });

  it('should update user status', async () => {
    const req: any = {
      params: {
        user_id: 'accepted_user',
      },
      body: {
        status: 'Accepted',
      },
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await updateUserStatus(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'accepted_user',
        status: 'Accepted',
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
