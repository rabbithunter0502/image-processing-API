import { Router, Request, Response } from 'express';

const homeController = Router();

homeController.get('/', (request: Request, response: Response): void => {
  response.render('index', { title: 'Image Processing Api' });
});

export default homeController;
