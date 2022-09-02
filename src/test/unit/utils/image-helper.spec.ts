import {promises as fs} from 'fs';
import path from 'path';
import imageHelper from 'utils/image-helper';
import {parse} from 'querystring';

describe('ImageHelper: ', (): void => {
  describe('ImageHelper: getImagePath function:', (): void => {
    it('should return null for invalid image name', async (): Promise<void> => {
      const queryParams = 'imageName=&width=50&height=50';
      const error = await imageHelper.getImagePath(parse(queryParams));
      expect(error).toBeNull();
    });

    it('should return true for valid image name', async (): Promise<void> => {
      const queryParams = 'imageName=fjord&width=50&height=50';
      await imageHelper.updateImageSize(parse(queryParams));
      const error = await imageHelper.getImagePath(parse(queryParams));
      expect(error).toBeTruthy();
    });
  });

  describe('ImageHelper: isImageAvailable function:', (): void => {
    it('should return false for invalid image name', async (): Promise<void> => {
      const imageName = 'imageName';
      const error = await imageHelper.isImageAvailable(imageName);
      expect(error).toBeFalse();
    });

    it('should return true for valid image name', async (): Promise<void> => {
      const imageName = 'fjord';
      const error = await imageHelper.isImageAvailable(imageName);
      expect(error).toBeTrue();
    });
  });

  describe('ImageHelper: isResizeImageAvailable function:', (): void => {
    it('should return false for missing width', async (): Promise<void> => {
      const queryParams = {
        imageName: 'fjord',
        height: '50'
      };
      const isResizeImageAvailable = await imageHelper.isResizeImageAvailable(
        queryParams
      );

      expect(isResizeImageAvailable).toBeFalse();
    });

    it('should return false for missing height', async (): Promise<void> => {
      const queryParams = {
        imageName: 'fjord',
        width: '50'
      };
      const isResizeImageAvailable = await imageHelper.isResizeImageAvailable(
        queryParams
      );

      expect(isResizeImageAvailable).toBeFalse();
    });

    it('should return false for image name does not exist', async (): Promise<void> => {
      const queryParams = {
        width: '50',
        height: '50'
      };
      const isResizeImageAvailable = await imageHelper.isResizeImageAvailable(
        queryParams
      );

      expect(isResizeImageAvailable).toBeFalse();
    });

    it('should return true for valid input', async (): Promise<void> => {
      const queryParams = {
        imageName: 'fjord',
        width: '50',
        height: '50'
      };
      await imageHelper.updateImageSize(queryParams);
      const isResizeImageAvailable = await imageHelper.isResizeImageAvailable(
        queryParams
      );

      expect(isResizeImageAvailable).toBeTrue();
    });
  });

  describe('ImageHelper: updateImageSize function:', (): void => {
    it('should return null for invalid width', async (): Promise<void> => {
      const queryParams = {
        imageName: 'fjord',
        width: '-50',
        height: '50'
      };
      const error = await imageHelper.updateImageSize(queryParams);
      expect(error).not.toBeNull();
    });

    it('should return null for invalid height', async (): Promise<void> => {
      const queryParams = {
        imageName: 'fjord',
        width: '50',
        height: '-50'
      };
      const error = await imageHelper.updateImageSize(queryParams);
      expect(error).not.toBeNull();
    });

    it('should return error for image name does not exist', async (): Promise<void> => {
      const queryParams = {
        imageName: 'fjordddd',
        width: '50',
        height: '50'
      };
      const error = await imageHelper.updateImageSize(queryParams);
      expect(error).not.toBeNull();
    });

    it('should resized image form origin size', async (): Promise<void> => {
      const queryParams = {
        imageName: 'fjord',
        width: '50',
        height: '50'
      };
      await imageHelper.updateImageSize(queryParams);
      const imagesResizePath = '../../../public/images/resize';

      const resizedImagePath = path.resolve(__dirname, imagesResizePath, `fjord-50x50.jpg`);
      let errorFile = null;

      try {
        await fs.access(resizedImagePath);
      } catch {
        errorFile = 'Image cannot be created';
      }

      expect(errorFile).toBeNull();
    });
  });
});
// Clear test file
afterAll(async (): Promise<void> => {
  const resizedImagePath = path.resolve(__dirname, imageHelper.imagesResizePath, `fjord-50x50.jpg`);
  try {
    await fs.access(resizedImagePath);
    await fs.unlink(resizedImagePath);
  } catch {
    console.log('something went wrong!');
  }
});
