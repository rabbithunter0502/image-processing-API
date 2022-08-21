import express, { Router, Request, Response } from 'express';
import * as ImageHelper from './../utils/image-helper';
import { IImageQuery } from '../interfaces/image-query.interface';

const checkQueryParams = async (query: IImageQuery): Promise<null | string> => {
  if (!(await ImageHelper.isImageAvailable(query.imageName))) {
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
  async (request: Request, response: Response): Promise<void> => {
    const validationMessage = await checkQueryParams(request.query);
    if (validationMessage) {
      response.send(validationMessage);
      return;
    }

    let error = null;

    if (!(await ImageHelper.isResizeImageAvailable(request.query))) {
      error = await ImageHelper.resizeImage(request.query);
    }

    if (error) {
      response.send(error);
      return;
    }

    const path = await ImageHelper.getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('something went wrong!');
    }
  }
);

export default imageProcessController;
