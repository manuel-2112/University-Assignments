/**
 * formStructure model
 */

import mongoose from 'mongoose';
import { IFormStructure } from './formStructure.interface';

export const formStructureSchema = new mongoose.Schema<IFormStructure>({
  name: { type: Boolean, default: false },
  email: { type: Boolean, default: false },
  phone: { type: Boolean, default: false },
  service: { type: Boolean, default: false },
  text: { type: Boolean, default: false },
});
