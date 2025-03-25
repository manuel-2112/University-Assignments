/**
 * This module contains the controller of the event entity, meaning, the functions that define the behavior of the API.
 */

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { exec } from 'child_process';
import { IEvent } from './event.interface';
import {
  create,
  getAll,
  update,
  getApproved,
  deleteById,
  getById,
  updateStatus,
} from './event.service';
import { EventStatus } from './status.enum';
import AppError from '../../core/utils/appError';

const runScript = (scriptPath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing ${scriptPath}: ${error.message}`));
      } else if (stderr) {
        reject(new Error(`Error in ${scriptPath} execution: ${stderr}`));
      } else {
        resolve(stdout);
      }
    });
  });
};

export const runScraper = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const corfoOutput = await runScript('scrappers/corfo.py');
    const spyderFiaOutput = await runScript('scrappers/spyder_fia.py');
    const proChileOutput = await runScript('scrappers/prochile.py');

    return res.status(httpStatus.OK).send({
      message: 'Scrapers executed successfully',
      output: `${corfoOutput}\n${spyderFiaOutput}\n${proChileOutput}`,
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: 'Error executing scrapers',
      error: err.message,
    });
  }
};

/**
 * Create an event
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const createEvent = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const eventData = req.body as IEvent;
    const createdEvent = await create(eventData);
    res.status(httpStatus.CREATED);
    return res.send({
      message: 'Event was created successfully',
      event: createdEvent,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Fetch all events
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const getAllEvents = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const events = await getAll();
    res.status(httpStatus.OK);
    return res.send(events);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Update an event only if there are admin credentials
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const updateEvent = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const eventId = req.params._id;
    const eventData = req.body as IEvent;
    const updatedEvent = await update(eventId, eventData);
    res.status(httpStatus.OK);
    return res.send({
      message: 'Event was updated successfully',
      event: updatedEvent,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Fetch an event by id
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const getEventById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const eventId = req.params._id;
    const event = await getById(eventId);
    res.status(httpStatus.OK);
    return res.send(event);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Delete an event by id
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const deleteEvent = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const eventId = req.params._id;
    await deleteById(eventId);
    res.status(httpStatus.ACCEPTED);
    return res.send({
      message: 'Event was removed successfully',
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Fetch all approved events
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const getApprovedEvents = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const events = await getApproved();
    res.status(httpStatus.OK);
    return res.send(events);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Update the status of an event
 * @param {Request} req
 * @param {Response} res
 * @public
 * @returns {Promise<Response>}
 * @throws {Error}
 */
export const updateEventStatus = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const eventId = req.params._id;
    const status = req.body.status as EventStatus;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid event ID');
    }

    const updatedEvent = await updateStatus(eventId, status);
    res.status(httpStatus.OK);
    return res.send({
      message: 'Event status was updated successfully',
      event: updatedEvent,
    });
  } catch (err) {
    res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).send({
      message: err.message || 'Event status was not updated!',
    });
  }
  return res;
};
