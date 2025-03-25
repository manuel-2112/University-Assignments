/**
 * This module contains the controller functions for the form data component.
 */

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { unauthorizedCompany } from '@components/authentication/auth.company';
import { readFormStructure } from '@components/formStructure/formStructure.service';
import { IFormStructure } from '@components/formStructure/formStructure.interface';
import { IFormData } from './formData.interface';
import { create, read, getAll, getFormsData } from './formData.service';

/**
 * Creates a new form data.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns The response with the created form data.
 */
export const createFormData = async (req: Request, res: Response) => {
  try {
    const formData = req.body as IFormData;
    formData.companyId = req.params.company_id;
    const formStructure: IFormStructure = await readFormStructure(
      formData.companyId,
    );
    const newFormData = await create(formData, formStructure);
    unauthorizedCompany(req, res);
    res.status(httpStatus.CREATED);
    return res.send({
      message: 'The form was created succesfully',
      formData: newFormData,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    return res;
  }
};

/**
 * Retrieves a specific form data by its ID.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing the retrieved form data.
 */
export const readFormData = async (req: Request, res: Response) => {
  try {
    const formDataId = req.params.form_data_id;
    const formData = await read(formDataId);
    res.status(httpStatus.OK);
    res.send({ formData });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Retrieves all form data.
 * @param req - The request object.
 * @param res - The response object.
 */
export const getAllFormData = async (req: Request, res: Response) => {
  try {
    const formsData: IFormData[] = await getAll();
    res.status(httpStatus.OK).json({ formData: formsData });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Retrieves the forms data for a specific company.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing the forms data for the company.
 */
export const getCompanyFormsData = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.company_id;
    const companyFormsData = await getFormsData(companyId);
    res.status(httpStatus.ACCEPTED);
    res.send({ formData: companyFormsData });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};
