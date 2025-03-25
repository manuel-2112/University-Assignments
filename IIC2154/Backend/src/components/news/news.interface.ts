/**
 * Interface for the News entity.
 */

export interface INews {
  title: string;
  additionalInfo: string;
  imageLink: string[];
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}
