/**
 * This module contains the routes to each event endpoint.
 */

import express from 'express';
import { validateStructure } from '@core/middlewares/validate.middleware';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getApprovedEvents,
  updateEventStatus,
  runScraper,
} from './event.controller';
// Import validation
import {
  updateEventValidation,
  createEventValidation,
  updateEventStatusValidation,
} from './event.validation';

const router = express.Router();

// Route to run the scraper
router.get('/scrape', runScraper);

// POST endpoints
router.post('/events', validateStructure(createEventValidation), createEvent);

// GET endpoints
router.get('/events', getAllEvents);
router.get('/events/approved', getApprovedEvents);
router.get('/events/:_id', getEventById);

// PUT endpoints
router.put(
  '/events/:_id',
  validateStructure(updateEventValidation),
  updateEvent,
);

// DELETE endpoints
router.delete('/events/:_id', deleteEvent);

// PATCH endpoints
router.patch(
  '/events/:_id/status',
  validateStructure(updateEventStatusValidation),
  updateEventStatus,
);

export default router;
