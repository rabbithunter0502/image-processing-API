import { Request, Response, Router } from 'express';
import path from 'path';

import imageHelper from 'utils/image-helper';
import { IImageQuery } from 'interfaces/image-query.interface';
import imageApiLogger from 'app/middlewares/image-api-logger.middleware';
import uploadImage from 'app/middlewares/image-upload.middleware';

const checkQueryParams = async (query: IImageQuery): Promise<null | string> => {
  if (!(await imageHelper.isImageAvailable(query.imageName))) {
    return `There is an invalid 'imageName', please check available images at home page`;
  }

  if (!query.width && !query.height) {
    return null;
  }

  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return 'There is an invalid number, please provide a positive numerical';
  }

  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return 'There is an invalid number, please provide a positive numerical';
  }

  return null;
};

const imageProcessController = Router();

imageProcessController.get(
  '/',
  imageApiLogger,
  async (request: Request, response: Response): Promise<void> => {
    const validationMessage = await checkQueryParams(request.query);
    if (validationMessage) {
      response.send(validationMessage);
      return;
    }

    let error = null;

    if (!(await imageHelper.isResizeImageAvailable(request.query))) {
      error = await imageHelper.updateImageSize(request.query);
    }

    if (error) {
      response.send(error);
      return;
    }

    const path = await imageHelper.getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('something went wrong!');
    }
  }
);

imageProcessController.post(
  '/',
  uploadImage.single('image'),
  async (req, res): Promise<any> => {
    // folder upload
    const imagePath = path.resolve(__dirname, '../public/images/origin');
    if (!req.file) {
      console.log('No file received');
      return res.send({
        success: false
      });
    }
    const tempPath = req.file.path;
    const targetPath = `${imagePath}/${req.file.originalname}`;
    const successCallback = () => res.redirect('/?uploadSuccess=true');
    const errorCallback = () =>
      res.send({
        success: false
      });
    imageHelper.uploadImage(
      tempPath,
      targetPath,
      successCallback,
      errorCallback
    );
  }
);

export default imageProcessController;
