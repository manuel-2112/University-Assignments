/**
 * Represents the model for the formData collection in the database.
 */

import mongoose from 'mongoose';
import { IFormData } from './formData.interface';

/**
 * Represents the schema for the formData collection in the database.
 */
export const formDataSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  service: { type: String },
  text: { type: String },
});

const FormDataModel = mongoose.model<IFormData>('FormData', formDataSchema);

export default FormDataModel;
