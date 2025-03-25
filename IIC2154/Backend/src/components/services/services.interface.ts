/**
 * Interface for the Service entity.
 */

export interface IService {
  _id: string;
  companyId: string;
  name: string;
  description: string;
  imageLink: string[];
  price: string;
  category: string[];
}
