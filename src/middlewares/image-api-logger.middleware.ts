import { Request, Response } from 'express';

const currentDateTime = (): string => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  const sec = new Date().getSeconds();
  return `${year}-${month}-${date} ${hour}:${min}:${sec}`;
};

const imageProcessedLog = (
  req: Request,
  res: Response,
  next: () => void
): void => {
  const isImageProcessed =
    req.query['imageName'] && req.query['width'] && req.query['height'];
  const method = req.method;
  const url = req.url;
  const status = res.statusCode;

  const action = isImageProcessed ? 'processed' : 'accessed';
  const message = `image was ${action} with response status ${status}`;
  const log = `[${currentDateTime()}] ${method}:${url} - ${message}`;
  console.info(log);
  next();
};

const imageApiLogger = [imageProcessedLog];
export default imageApiLogger;
