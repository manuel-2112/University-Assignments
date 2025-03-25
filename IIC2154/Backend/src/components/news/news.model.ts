/**
 * Schema for the News collection.
 */

import { Schema, model } from 'mongoose';
import { INews } from './news.interface';

// schema (estructura del documento) basado en una interfaz
const newsSchema = new Schema<INews>({
  title: { type: String, required: true },
  additionalInfo: { type: String, required: true },
  imageLink: [{ type: String }],
  isVisible: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

// modelo (instancia del schema)
export default model<INews>('News', newsSchema);
