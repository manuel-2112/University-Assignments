/**
 * Interface for the Company component.
 */

import { IFormData } from '@components/formData/formData.interface';
import { IService } from '../services/services.interface';
import { IFormStructure } from '../formStructure/formStructure.interface';

export interface IAccountData {
  name: string;
  email: string;
  rut: string;
  logo: string;
  address: string;
  city: string;
  region: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  instagramUrl: string;
  linkedinUrl: string;
  webpageUrl: string;
  branchRegions: string[];
}

export interface ICompany {
  _id: string;
  permissions: {
    isVerified: boolean;
    isSuperuser: boolean;
  };
  accountData: IAccountData;
  formStructure: IFormStructure;
  formsData: IFormData[];
  servicesData: IService[];
}
