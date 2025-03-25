/**
 * This module contains the unit tests for the event controller.
 */

import mongoose from 'mongoose';
import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getApprovedEvents,
  updateEventStatus,
} from '../../../src/components/event/event.controller';
import syntheticEvents from '../../data/synthetic_events.json';
import {
  createMongoContainer,
  connect,
  closeConnection,
} from '../../../src/core/utils/create_container';

jest.setTimeout(60000); // Increased to 1 minute

let container: any;
const eventIds: string[] = [];
let convertedEvents: any[] = [];

beforeAll(async () => {
  const env = await createMongoContainer();
  container = env.container;
  process.env.DB_URL = env.mongoUrl;
  await connect();
  convertedEvents = syntheticEvents.map((event) => ({
    ...event,
    initialDate: new Date(event.initialDate),
    finalDate: new Date(event.finalDate),
  }));

  // Create all events in parallel
  const createEventPromises = syntheticEvents.slice(1).map(async (event) => {
    const req: any = { body: event };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await createEvent(req, res);
    return res.send.mock.calls[0][0].event._id;
  });

  const createdEventIds = await Promise.all(createEventPromises);
  eventIds.push(...createdEventIds);
});

describe('Event Controller', () => {
  it('should create a new event', async () => {
    const req: any = {
      body: convertedEvents[0],
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await createEvent(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Event was created successfully',
        event: expect.objectContaining(convertedEvents[0]),
      }),
    );
  });

  it('should fetch all events', async () => {
    const req: any = {};
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await getAllEvents(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining(convertedEvents[1]),
        expect.objectContaining(convertedEvents[2]),
        expect.objectContaining(convertedEvents[3]),
      ]),
    );
  });

  it('should update an event', async () => {
    const req: any = {
      body: convertedEvents[3],
      params: { _id: eventIds[2].toString() },
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await updateEvent(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Event was updated successfully',
        event: expect.objectContaining(convertedEvents[3]),
      }),
    );
  });

  it('should fetch an event by id', async () => {
    const req: any = {
      params: { _id: eventIds[1] },
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await getEventById(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining(convertedEvents[2]),
    );
  });

  it('should delete an event', async () => {
    const req: any = {
      params: { _id: eventIds[0] },
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await deleteEvent(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Event was removed successfully',
      }),
    );
  });

  it('should fetch all approved events', async () => {
    const req: any = {};
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await getApprovedEvents(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining(convertedEvents[0])]),
    );
  });

  it('should update an event status', async () => {
    const req: any = {
      body: { status: 'Aprobado' },
      params: { _id: eventIds[2] }, // Ensure this is valid
    };
    // console.log("This is the event ID: " + req.params._id); // This should print "1
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await updateEventStatus(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Event status was updated successfully',
        event: expect.objectContaining({
          ...convertedEvents[3],
          status: 'Aprobado',
        }), // Check status
      }),
    );
  });

  it('should return an error when updating an event status', async () => {
    const req: any = {
      body: { status: 'Aprobado' },
      params: { _id: 'invalid_id' },
    };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    await updateEventStatus(req, res);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Invalid event ID',
      }),
    );
  });
});

const closeMongooseConnection = async () => {
  await mongoose.disconnect();
};

afterAll(async () => {
  await closeMongooseConnection();
  await closeConnection(container);
});
