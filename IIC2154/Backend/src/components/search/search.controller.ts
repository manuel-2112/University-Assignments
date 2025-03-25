/** Purpose: Controller for search endpoints.
 * It filters out common words from a query, constructs a regex
 * from an array of words, and searches and sorts by priority for MongoDB models,
 * including counting matches. */

import { Request, Response } from 'express';
import CompanyModel from '@components/company/company.model';
import ServiceModel from '@components/services/services.model';
import { SPANISH_STOPWORDS } from './search.constants';

/**
 * Filters out common words from a query.
 * @param query - The query string.
 * @returns An array of words without common words.
 */
const filterCommonWords = (query: string): string[] => {
  return query.split(' ').filter((word) => !SPANISH_STOPWORDS.includes(word));
};

/**
 * Constructs a regex from an array of words.
 * @param words - The array of words.
 * @returns A regex object.
 */
const constructRegexFromWords = (words: string[]): RegExp => {
  return new RegExp(words.join('|'), 'i');
};

/**
 * Generalized search and sort by priority for MongoDB models, including counting matches.
 * @param model - The MongoDB model.
 * @param fields - Fields to be matched against the regex. It includes the name and description.
 * @param searchRegex - The regex created from the query.
 * @returns A sorted array of documents based on the search priority and number of matches.
 */
const searchAndSort = async (
  model: any,
  fields: { name: string; description: string },
  searchRegex: RegExp,
) => {
  return model.aggregate([
    {
      $match: {
        $or: [
          { [fields.name]: searchRegex },
          { [fields.description]: searchRegex },
        ],
      },
    },
    {
      $addFields: {
        score: {
          $cond: {
            if: {
              $regexMatch: { input: `$${fields.name}`, regex: searchRegex },
            },
            then: 1,
            else: 2,
          },
        },
        nameMatchCount: {
          $size: {
            $filter: {
              input: { $split: [{ $ifNull: [`$${fields.name}`, ''] }, ' '] },
              as: 'word',
              cond: { $regexMatch: { input: '$$word', regex: searchRegex } },
            },
          },
        },
        descriptionMatchCount: {
          $size: {
            $filter: {
              input: {
                $split: [{ $ifNull: [`$${fields.description}`, ''] }, ' '],
              },
              as: 'word',
              cond: { $regexMatch: { input: '$$word', regex: searchRegex } },
            },
          },
        },
      },
    },
    {
      $addFields: {
        totalMatchCount: {
          $add: ['$nameMatchCount', '$descriptionMatchCount'],
        },
      },
    },
    {
      $sort: { score: 1, totalMatchCount: -1, [fields.name]: 1 },
    },
  ]);
};

/**
 * Retrieves arrays of companies and services with the queried term, ignoring common words.
 * Companies and services are sorted so that matches by name are listed before matches by description.
 * @param req - The request object.
 * @param res - The response object.
 */
export const search = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const filteredWords = filterCommonWords(query);
    const searchRegex = constructRegexFromWords(filteredWords);

    const companiesResults = await searchAndSort(
      CompanyModel,
      { name: 'accountData.name', description: 'accountData.description' },
      searchRegex,
    );
    const servicesResults = await searchAndSort(
      ServiceModel,
      { name: 'name', description: 'description' },
      searchRegex,
    );

    res.json({
      companies: companiesResults,
      services: servicesResults,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Retrieves array of companies with the queried term, ignoring common words.
 * Companies are sorted so that matches by name are listed before matches by description.
 * @param req - The request object.
 * @param res - The response object.
 */
export const searchCompanies = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const filteredWords = filterCommonWords(query);
    const searchRegex = constructRegexFromWords(filteredWords);

    const companiesResults = await searchAndSort(
      CompanyModel,
      { name: 'accountData.name', description: 'accountData.description' },
      searchRegex,
    );
    res.json({ companies: companiesResults });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * Retrieves array of services with the queried term, ignoring common words.
 * Services are sorted so that matches by name are listed before matches by description.
 * @param req - The request object.
 * @param res - The response object.
 */
export const searchServices = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const filteredWords = filterCommonWords(query);
    const searchRegex = constructRegexFromWords(filteredWords);

    const servicesResults = await searchAndSort(
      ServiceModel,
      { name: 'name', description: 'description' },
      searchRegex,
    );
    res.json({ services: servicesResults });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
