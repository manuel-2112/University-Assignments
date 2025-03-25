import { addLogo } from '@components/company/company.service';
import { addImage as addServiceImage } from '@components/services/services.service';
import { addImage as addNewsImage } from '@components/news/news.service';
import logger from '@core/utils/logger';

export const addImageToCompany = async (
  companyId: string,
  imageUrl: string,
) => {
  try {
    await addLogo(companyId, imageUrl);
    logger.debug('Logo added to company with id: ', companyId);
    return true;
  } catch (err) {
    return null;
  }
};

export const addImageToService = async (
  serviceId: string,
  imageUrl: string,
) => {
  try {
    await addServiceImage(serviceId, imageUrl);
    logger.debug('Image added to service with id: ', serviceId);
    return true;
  } catch (err) {
    return null;
  }
};

export const addImageToNews = async (newsId: string, imageUrl: string) => {
  try {
    await addNewsImage(newsId, imageUrl);
    logger.debug('Image added to news with id: ', newsId);
    return true;
  } catch (err) {
    return null;
  }
};
