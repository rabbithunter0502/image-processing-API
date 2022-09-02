import { Application, Router } from 'express';
import homeController from './controllers/home.controller';
import imageProcessController from './controllers/image-process.controller';

const routeArray: [string, Router][] = [
  ['/', homeController],
  ['/image-process', imageProcessController]
];

const routes = (app: Application) => {
  routeArray.forEach(route => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};

export default routes;
