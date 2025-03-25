import mongoose from 'mongoose';
import { IService } from './services.interface';

/**
 * Service Model, represents the schema for the service collection
 */

export const serviceSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  imageLink: [
    {
      type: String,
      required: false,
    },
  ],
  price: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
});

const ServiceModel = mongoose.model<IService>('Service', serviceSchema);

export default ServiceModel;
