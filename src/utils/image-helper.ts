import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { IImageQuery } from '../interfaces/image-query.interface';

export const imagesOriginSizePath = path.resolve(
  __dirname,
  '../public/images/origin'
);

export const imagesResizePath = path.resolve(
  __dirname,
  '../public/images/resize'
);

export const getImagePath = async (
  queryParams: IImageQuery
): Promise<null | string> => {
  if (!queryParams.imageName) {
    return null;
  }

  const imagePath =
    queryParams.width && queryParams.height
      ? path.resolve(
          imagesResizePath,
          `${queryParams.imageName}-${queryParams.width}x${queryParams.height}.jpg`
        )
      : path.resolve(imagesOriginSizePath, `${queryParams.imageName}.jpg`);
  try {
    await fs.access(imagePath);
    return imagePath;
  } catch {
    return null;
  }
};

export const isImageAvailable = async (imageName = ''): Promise<boolean> => {
  if (!imageName) {
    return false;
  }
  let existImages: string[];
  try {
    existImages = (await fs.readdir(imagesOriginSizePath)).map(
      (filename: string): string => filename.split('.')[0]
    );
  } catch {
    existImages = [];
  }

  return existImages.includes(imageName);
};

export const isResizeImageAvailable = async (
  queryParams: IImageQuery
): Promise<boolean> => {
  if (!queryParams.imageName || !queryParams.width || !queryParams.height) {
    return false;
  }

  const imagePath: string = path.resolve(
    imagesResizePath,
    `${queryParams.imageName}-${queryParams.width}x${queryParams.height}.jpg`
  );

  try {
    await fs.access(imagePath);
    return true;
  } catch {
    return false;
  }
};

export const resizeImage = async (
  queryParams: IImageQuery
): Promise<null | string> => {
  if (!queryParams.imageName || !queryParams.width || !queryParams.height) {
    return null;
  }

  const source = path.resolve(
    imagesOriginSizePath,
    `${queryParams.imageName}.jpg`
  );
  const target = path.resolve(
    imagesResizePath,
    `${queryParams.imageName}-${queryParams.width}x${queryParams.height}.jpg`
  );
  const width = parseInt(queryParams.width);
  const height = parseInt(queryParams.height);

  try {
    await sharp(source).resize(width, height).toFile(target);
    return null;
  } catch {
    return 'Image could not be resized.';
  }
};

export default {
  getImagePath,
  isImageAvailable,
  isResizeImageAvailable,
  resizeImage
};
