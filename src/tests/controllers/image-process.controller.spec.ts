import supertest from 'supertest';
import { promises as fs } from 'fs';
import path from 'path';
import { imagesResizePath } from '../../utils/image-helper';
import app from '../../index';

const request = supertest(app);

describe('Image Process controller', (): void => {
  describe('endpoint: /image-process', (): void => {
    it('should return original image when get /image-process?imageName=fjord', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/image-process?imageName=fjord'
      );
      expect(response.status).toBe(200);
    });

    it('should return original image when get /image-process?imageName=fjord&width=199&height=199 (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/image-process?imageName=fjord&width=50&height=50'
      );

      expect(response.status).toBe(200);
    });

    it('should return original image when get /image-process?imageName=fjord&width=-200&height=200 (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/image-process?imageName=fjord&width=-200&height=200'
      );

      expect(response.status).toBe(200);
    });

    it('should return error string when get /image-process', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/image-process');

      expect(response.text).toBe(
        "There is an invalid 'imageName', please check available images at home page"
      );
    });
  });

  describe('endpoint: /invalid', (): void => {
    it('should return error page for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/invalid');

      expect(response.text).toContain('Cannot GET');
    });
  });
});

// Clear test file
afterAll(async (): Promise<void> => {
  const resizedImagePath = path.resolve(imagesResizePath, `fjord-50x50.jpg`);
  try {
    await fs.access(resizedImagePath);
    await fs.unlink(resizedImagePath);
  } catch {
    console.log('something went wrong!');
  }
});
