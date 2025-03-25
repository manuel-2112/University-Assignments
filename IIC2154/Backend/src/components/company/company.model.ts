/**
 * Model for Company
 */

import mongoose from 'mongoose';
import config from '@config/config';
import { ICompany } from './company.interface';
import { formStructureSchema } from '../formStructure/formStructure.model';

const companySchema = new mongoose.Schema<ICompany>({
  permissions: {
    isVerified: { type: Boolean, default: false },
    isSuperuser: { type: Boolean, default: false },
  },
  accountData: {
    name: { type: String },
    email: { type: String },
    rut: { type: String },
    logo: { type: String, default: config.default_company_logo },
    region: { type: String },
    city: { type: String },
    address: { type: String },
    description: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    instagramUrl: { type: String },
    linkedinUrl: { type: String },
    webpageUrl: { type: String },
    branchRegions: { type: [String] },
  },
  formStructure: formStructureSchema,
  formsData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FormData',
    },
  ],
  servicesData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
  ],
});

const CompanyModel = mongoose.model<ICompany>('Company', companySchema);

export default CompanyModel;
