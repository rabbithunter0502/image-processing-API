import { Router, Request, Response } from 'express';
import imageHelper from 'utils/image-helper';

const homeController = Router();

homeController.get(
  '/',
  async (request: Request, response: Response): Promise<void> => {
    const existOriginImages = await imageHelper.getExistOriginImages();
    response.render('index', {
      title: 'Image Processing Api',
      existOriginImages
    });
  }
);

export default homeController;
