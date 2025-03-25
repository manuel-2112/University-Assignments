/** This module contains the event model and its respective attributes */

import mongoose, { Schema } from 'mongoose';
import { IEvent } from './event.interface';
import { EventType } from './type.enum';
import { EventStatus } from './status.enum';

const eventSchema: Schema = new Schema<IEvent>({
  name: { type: String, required: true },
  initialDate: { type: Date, required: true },
  finalDate: { type: Date, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: Object.values(EventType), required: true },
  status: { type: String, enum: Object.values(EventStatus), required: true },
});

const EventModel = mongoose.model<IEvent>('Event', eventSchema);
export default EventModel;
