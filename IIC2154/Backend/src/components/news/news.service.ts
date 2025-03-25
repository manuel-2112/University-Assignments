/**
 * Service related functions for adding and deleting images
 */

import logger from '@core/utils/logger';
import NewsModel from './news.model';

/**
 * Add image to a News
 * @param newsId - News ID
 * @param imgUrl - string for New Image URL
 */
export const addImage = async (newsId: string, imgUrl: string) => {
  await NewsModel.findByIdAndUpdate(
    newsId,
    { $push: { imageLink: imgUrl } },
    { new: true },
  );
  logger.debug(`Added image to news id ${newsId}`);
};

/**
 * Delete an Image from News
 * @param newsId - News ID
 * @param imgUrl - string for Deleted Image URL
 * @returns Updated News
 */
export const deleteImage = async (newsId: string, imgUrl: string) => {
  const updatedNews = await NewsModel.findByIdAndUpdate(
    newsId,
    { $pull: { imageLink: imgUrl } },
    { new: true },
  );
  logger.debug(`Removed image from news id ${newsId}`);
  return updatedNews;
};
