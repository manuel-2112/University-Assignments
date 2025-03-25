/**
 * This module contains the controller of the company entity, meaning, the functions that define the behavior of the API.
 */

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {
  create,
  read,
  getAll,
  getAllUnverified,
  update,
  deleteById,
  verifyCompanyById,
  sendRegistrationEmail,
} from '@components/company/company.service';
import { IAccountData, ICompany } from '@components/company/company.interface';
import CompanyModel from '@components/company/company.model';
import { unauthorizedAdmin } from '@components/authentication/auth.admin';
import UserModel from '@components/user/user.model';

/**
 * Create a company
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const createCompany = async (req: Request, res: Response) => {
  try {
    const receivedEmail = req.body.email;
    const company: IAccountData = await CompanyModel.findOne({
      'accountData.email': receivedEmail,
    });
    if (!company) {
      const data = req.body as IAccountData;
      const createdCompany = await create(data);
      res.status(httpStatus.CREATED);

      await sendRegistrationEmail(data.name, data.email);

      return res.send({
        message: 'The company was created succesfully',
        company: createdCompany,
      });
    }
    res.status(httpStatus.FOUND);
    return res.send({ message: 'You are already registred' });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Login a company
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const loginCompany = async (req: Request, res: Response) => {
  try {
    let company: ICompany = await CompanyModel.findOne({
      'accountData.email': req.body.email,
    });
    res.status(httpStatus.OK);
    if (!company) {
      const data = req.body as IAccountData;
      company = await create(data);
      res.status(httpStatus.CREATED);
      await sendRegistrationEmail(data.name, data.email);
    }

    const response = {
      companyId: company._id,
      superuser: company.permissions.isSuperuser,
    };
    return res.send({ message: 'Login Successful', company: response });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  // Add a return statement here
  return res;
};

/**
 * Read a company
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const readCompany = async (req: Request, res: Response) => {
  try {
    res.status(httpStatus.OK);
    const company = await read(req.params.company_id);
    res.send({ company });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Get all companies
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await getAll();
    const compareRandom = () => Math.random() - 0.5;
    companies.sort(compareRandom);
    res.status(200).json({ company: companies });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Get all unverified companies
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const getAllUnverifiedCompanies = async (
  req: Request,
  res: Response,
) => {
  try {
    const companies = await getAllUnverified();
    unauthorizedAdmin(req, res);
    res.status(httpStatus.OK).json({ company: companies });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Privileged Update of a Company
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const privilegedUpdateCompany = async (req: Request, res: Response) => {
  try {
    const data = req.body as IAccountData;
    const companyId = req.params.company_id;
    const updatedCompany = await update(data, companyId);
    res.status(httpStatus.OK);
    res.send({ message: 'Updated', company: updatedCompany });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Update of a Company
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const updateCompany = async (req: Request, res: Response) => {
  try {
    const ownerId = req.body.user_id;
    const data = req.body.companyData as IAccountData;
    const companyId = req.params.company_id;

    const owner = await UserModel.findOne({ user_id: ownerId });
    if (!owner) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'Supposed Owner does not exist' });
    }
    if (!owner.ownedCompanies.includes(companyId)) {
      res.status(httpStatus.BAD_REQUEST);
      return res.send({ message: 'Supposed Owner is not owner' });
    }

    const updatedCompany = await update(data, companyId);
    res.status(httpStatus.OK);
    res.send({ message: 'Updated', company: updatedCompany });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Delete a company
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const deleteCompany = async (req: Request, res: Response) => {
  try {
    await deleteById(req.params.company_id);
    unauthorizedAdmin(req, res);
    res.status(httpStatus.ACCEPTED);
    res.send({ message: 'Removed' });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Verify a company
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const verifyCompany = async (req: Request, res: Response) => {
  try {
    const isVerified = req.body.isVerified;
    const companyId = req.params.company_id;
    await verifyCompanyById(isVerified, companyId);
    unauthorizedAdmin(req, res);
    res.status(httpStatus.ACCEPTED);
    res.send({ message: 'Company verified' });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};
