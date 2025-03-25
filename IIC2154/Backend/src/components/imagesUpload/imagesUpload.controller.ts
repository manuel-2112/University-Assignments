import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { deleteLogo } from '@components/company/company.service';
import { deleteImage as deleteImageFromService } from '@components/services/services.service';
import { deleteImage as deleteImageFromNews } from '@components/news/news.service';
import { MulterS3File } from './imagesUpload.interface';
import {
  addImageToCompany,
  addImageToService,
  addImageToNews,
} from './imagesUpload.service';

export const setCompanyImage = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.company_id;
    const file = req.file as MulterS3File;
    const imgUrl = file.location;
    await addImageToCompany(companyId, imgUrl);
    res.send({
      message: 'The image was uploaded successfully!',
      image: file,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const setServiceImage = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.service_id;
    const file = req.file as MulterS3File;
    const imgUrl = file.location;
    await addImageToService(serviceId, imgUrl);
    res.send({
      message: 'The image was uploaded successfully!',
      image: file,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const setNewsImage = async (req: Request, res: Response) => {
  try {
    const newsId = req.params.news_id;
    const file = req.file as MulterS3File;
    const imgUrl = file.location;
    await addImageToNews(newsId, imgUrl);
    res.send({
      message: 'The image was uploaded successfully!',
      image: file,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const deleteCompanyLogo = async (req, res) => {
  try {
    const companyId = req.params.company_id;
    const imgUrl = req.body.logo;
    await deleteLogo(companyId, imgUrl);
    res.send({
      message: 'The logo was deleted successfully!',
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err.message });
  }
};

export const deleteServiceImage = async (req, res) => {
  try {
    const serviceId = req.params.service_id;
    const imgUrl = req.body.imageLink;
    await deleteImageFromService(serviceId, imgUrl);
    res.send({
      message: 'The image service was deleted successfully!',
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const deleteNewsImage = async (req, res) => {
  try {
    const newsId = req.params.news_id;
    const imgUrl = req.body.imageLink;
    await deleteImageFromNews(newsId, imgUrl);
    res.send({
      message: 'The image news was deleted successfully!',
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};
