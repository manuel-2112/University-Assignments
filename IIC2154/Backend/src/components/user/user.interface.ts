/**
 * Interface of user
 */
import { Status } from './status.enum';
import { Role } from './role.enum';

export interface IUser {
  user_id: string;
  favoriteCompanies: string[];
  status: Status;
  displayData: IDisplayData;
  role: Role;
  claimedCompanies: string[];
  ownedCompanies: string[];
}

export interface IDisplayData {
  name: string;
  number: string;
  email: string;
  motivation: string;
}
