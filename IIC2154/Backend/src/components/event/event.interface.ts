/** Interface of the event entity */

import { EventType } from './type.enum';
import { EventStatus } from './status.enum';

export interface IEvent {
  _id: string;
  name: string;
  initialDate: Date;
  finalDate: Date;
  url: string;
  type: EventType;
  status: EventStatus;
}
