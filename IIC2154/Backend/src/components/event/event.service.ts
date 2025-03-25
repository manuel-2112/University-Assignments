/** This module contains the db operations of the event entity */

import logger from '@core/utils/logger';
import httpStatus from 'http-status';
import AppError from '@core/utils/appError';
import { IEvent } from './event.interface';
import EventModel from './event.model';
import { EventStatus } from './status.enum';

/**
 * Convert strings to date
 */
export const convertDate = (date: string): Date => {
  return new Date(date);
};

/**
 * Validate dates
 * @param initialDate The initial date
 * @param finalDate The final date
 * @throws AppError If the initial date is not before the final date
 */
export const validateDates = (initialDate: Date, finalDate: Date): void => {
  if (!(initialDate < finalDate)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Initial date must be before final date',
    );
  }
};

/**
 * Creates a new event.
 * @param event The event object to create.
 * @returns Promise<IEvent> Newly created event.
 * @throws AppError If there's an error creating the event.
 */
export const create = async (event: IEvent): Promise<IEvent> => {
  try {
    const initialDate = new Date(event.initialDate);
    const finalDate = new Date(event.finalDate);
    if (initialDate > finalDate) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Initial date must be before final date',
      );
    }
    validateDates(initialDate, finalDate);
    const newEvent = await EventModel.create(event);
    logger.debug(`Event created: %O`, newEvent);
    return newEvent;
  } catch (err) {
    logger.error(`Event create err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Event was not created!');
  }
};

/**
 * Fetches all events.
 * @returns Promise<IEvent[]> Array of all events.
 * @throws AppError If there's an error fetching the events.
 */
export const getAll = async (): Promise<IEvent[]> => {
  try {
    const events = await EventModel.find();
    return events;
  } catch (err) {
    logger.error(`Fetch events err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Events were not retrieved!');
  }
};

/**
 * Fetches event by id.
 * @param eventId The event's id.
 * @returns Promise<IEvent> The event with the given id.
 * @throws AppError If there's an error fetching the event.
 */
export const getById = async (eventId: string): Promise<IEvent> => {
  try {
    // Find event by id
    const event = await EventModel.findById(eventId);
    if (!event) {
      throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
    }
    return event;
  } catch (err) {
    logger.error(`Fetch event by id err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Event was not retrieved!');
  }
};

/**
 * Updates an event by id.
 * @param eventId The event's id.
 * @param event The event details to update.
 * @throws AppError If there's an error updating the event.
 * @returns Promise<IEvent> The updated event.
 */
export const update = async (
  eventId: string,
  event: IEvent,
): Promise<IEvent> => {
  try {
    // Find the event by ID and update it with the new details
    const updatedEvent = await EventModel.findByIdAndUpdate(eventId, event, {
      new: true,
    });

    // If no event is found, throw a NOT_FOUND error
    if (!updatedEvent) {
      throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
    }

    // Return the updated event
    return updatedEvent;
  } catch (err) {
    // Log the error and throw a BAD_REQUEST error
    logger.error(`Update event err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Event was not updated!');
  }
};

/** Update status of an event
 * @param eventId The event's id
 * @param status The new status
 * @throws AppError If there's an error updating the event
 * @returns Promise<IEvent> The updated event
 */
export const updateStatus = async (
  eventId: string,
  status: string,
): Promise<IEvent> => {
  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      { status },
      { new: true },
    );

    //   console.log(updatedEvent);
    if (!updatedEvent) {
      throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
    }
    return updatedEvent;
  } catch (err) {
    logger.error(`Update event status err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Event status was not updated!');
  }
};

/**
 * Deletes event by id.
 * @param eventId The event's id.
 * @throws AppError If there's an error deleting the event.
 * @returns Promise<void>
 */
export const deleteById = async (eventId: string): Promise<void> => {
  try {
    const event = await EventModel.findByIdAndDelete(eventId);
    if (!event) {
      throw new AppError(httpStatus.NOT_FOUND, 'Event not found');
    }
  } catch (err) {
    logger.error(`Delete event err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Event was not deleted!');
  }
};

/**
 * Get approved events
 * @returns Promise<IEvent[]> Array of approved events
 * @throws AppError If there's an error fetching the events
 */
export const getApproved = async (): Promise<IEvent[]> => {
  try {
    const events = await EventModel.find({ status: EventStatus.APPROVED });
    return events;
  } catch (err) {
    logger.error(`Fetch approved events err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Events were not retrieved!');
  }
};
