import { IAccountData } from '@components/company/company.interface';

/* eslint-disable security/detect-object-injection */
export const buildFieldsToUpdate = (obj: IAccountData, parentKey = '') => {
  let fields: { [key: string]: any } = {}; // Add type annotation to fields variable
  for (const [key, value] of Object.entries(obj)) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      fields = { ...fields, ...buildFieldsToUpdate(value, newKey) };
    } else {
      fields[newKey] = value;
    }
  }
  return fields;
};

/* eslint-enable security/detect-object-injection */
