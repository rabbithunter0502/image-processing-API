import { promises as fs } from 'fs';
import * as fileSys from 'fs';
import path from 'path';
import sharp from 'sharp';
import { IImageQuery } from 'interfaces/image-query.interface';

export const IMAGE_ORIGIN_PATH = '../public/images/origin';

export const IMAGE_RESIZE_PATH = '../public/images/resize';

const getImagePath = async (
  queryParams: IImageQuery
): Promise<null | string> => {
  if (!queryParams.imageName) {
    return null;
  }

  const imagePath =
    queryParams.width && queryParams.height
      ? path.resolve(
          __dirname,
          IMAGE_RESIZE_PATH,
          `${queryParams.imageName}-${queryParams.width}x${queryParams.height}.jpg`
        )
      : path.resolve(
          __dirname,
          IMAGE_ORIGIN_PATH,
          `${queryParams.imageName}.jpg`
        );
  try {
    await fs.access(imagePath);
    return imagePath;
  } catch {
    return null;
  }
};

const isImageAvailable = async (imageName = ''): Promise<boolean> => {
  if (!imageName) {
    return false;
  }
  let existImages: string[];
  try {
    const imagePath = path.resolve(__dirname, IMAGE_ORIGIN_PATH);
    existImages = (await fs.readdir(imagePath)).map(
      (filename: string): string => filename.split('.')[0]
    );
  } catch {
    existImages = [];
  }

  return existImages.includes(imageName);
};

const getExistOriginImages = async (): Promise<string[]> => {
  let existImages: string[];
  try {
    const imagePath = path.resolve(__dirname, IMAGE_ORIGIN_PATH);
    existImages = await fs.readdir(imagePath);
  } catch {
    existImages = [];
  }
  return existImages;
};

const isResizeImageAvailable = async (
  queryParams: IImageQuery
): Promise<boolean> => {
  if (!queryParams.imageName || !queryParams.width || !queryParams.height) {
    return false;
  }

  const imagePath: string = path.resolve(
    __dirname,
    IMAGE_RESIZE_PATH,
    `${queryParams.imageName}-${queryParams.width}x${queryParams.height}.jpg`
  );

  try {
    await fs.access(imagePath);
    return true;
  } catch {
    return false;
  }
};

const updateImageSize = async (
  queryParams: IImageQuery
): Promise<null | string> => {
  if (!queryParams.imageName || !queryParams.width || !queryParams.height) {
    return null;
  }

  const source = path.resolve(
    __dirname,
    IMAGE_ORIGIN_PATH,
    `${queryParams.imageName}.jpg`
  );
  const target = path.resolve(
    __dirname,
    IMAGE_RESIZE_PATH,
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

const uploadImage = (
  tempPath: string,
  targetPath: string,
  successCallBack: () => void,
  errorCallBack: () => void
): void => {
  const source = fileSys.createReadStream(tempPath);
  const destination = fileSys.createWriteStream(targetPath);
  source.pipe(destination);
  source.on('end', function () {
    fileSys.unlink(tempPath, successCallBack);
  });
  source.on('error', errorCallBack);
};

const imageHelper = {
  getImagePath,
  isImageAvailable,
  isResizeImageAvailable,
  updateImageSize,
  uploadImage,
  getExistOriginImages,
  imagesOriginSizePath: IMAGE_ORIGIN_PATH,
  imagesResizePath: IMAGE_RESIZE_PATH
};

export default imageHelper;
