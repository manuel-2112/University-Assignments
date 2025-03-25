/**
 * This module contains the controller of the news entity.
 */

import { Request, Response } from 'express';
import logger from '@core/utils/logger';

import { unauthorizedAdmin } from '@components/authentication/auth.admin';
import NewsModel from './news.model';
import { INews } from './news.interface';

/**
 * Create news
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Confirmation message and created news
 * @throws If news could not be created
 */
export const createNews = async (req: Request, res: Response) => {
  try {
    // unauthorizedAdmin(req, res);
    const createdNews = await NewsModel.create(req.body as INews);
    res
      .status(201)
      .send({ message: 'News item created successfully.', news: createdNews });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ message: 'News item could not be created.' });
  }
};

/**
 * Retrieves news by id
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns News item
 * @throws If news doesn't exist, or it was unable to retrieve.
 */
export const readNewsById = async (req: Request, res: Response) => {
  try {
    const newsItem = (await NewsModel.findOne({ _id: req.params.id })) as INews;
    if (!newsItem) throw Error('News does not exist.');
    res.status(200).send(newsItem);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ message: 'Unable to obtain the requested news.' });
  }
};

/**
 * Retrieves every news
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns All news items
 * @throws If it was unable to obtain news
 */
export const readAllNews = async (req: Request, res: Response) => {
  try {
    unauthorizedAdmin(req, res);
    const allNews = (await NewsModel.find()) as INews[];
    res.status(200).send(allNews);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ message: 'Unable to obtain news.' });
  }
};

/**
 * Retrieves every visible news
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns All visible news items
 * @throws If it was unable to obtain visible news
 */
export const readVisibleNews = async (req: Request, res: Response) => {
  try {
    const visibleNews = (await NewsModel.find({ isVisible: true })) as INews[];
    res.status(200).send(visibleNews);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ message: 'Unable to obtain visible news.' });
  }
};

/**
 * Retrieves every hidden news
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns All hidden news items
 * @throws If it was unable to obtain hidden news
 */
export const readHiddenNews = async (req: Request, res: Response) => {
  try {
    unauthorizedAdmin(req, res);
    const hiddenNews = (await NewsModel.find({ isVisible: false })) as INews[];
    res.status(200).send(hiddenNews);
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ message: 'Unable to obtain visible news.' });
  }
};

/**
 * Update news by its Id
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Confirmation message
 * @throws If it was unable to find news, or it was unable to update
 */
export const updateNewsById = async (req: Request, res: Response) => {
  try {
    unauthorizedAdmin(req, res);
    const newValues = req.body as INews;
    newValues.updatedAt = new Date();
    const updatedNews = await NewsModel.updateOne(
      { _id: req.params.id },
      { $set: newValues },
    );
    if (!updatedNews) throw Error('No news was updated.');
    res.status(200).send({ message: 'News item updated successfully.' });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ message: 'Unable to update the requested news.' });
  }
};

/**
 * Delete news by Id
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Confirmation message
 * @throws If it was unable to find news or couldn't delete the news.
 */
export const deleteNewsById = async (req: Request, res: Response) => {
  try {
    unauthorizedAdmin(req, res);
    const deletedNews = await NewsModel.deleteOne({ _id: req.params.id });
    if (!deletedNews) throw Error('No news to delete.');
    res.status(202).send({ message: 'News item deleted successfully.' });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send({ message: 'Unable to delete the requested news.' });
  }
};
