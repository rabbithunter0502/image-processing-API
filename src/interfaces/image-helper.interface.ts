import {IImageQuery} from "./image-query.interface";

export interface IImageHelper {

    getImagePath(queryParams: IImageQuery): Promise<null | string>;

    isImageAvailable(imageName: string): Promise<boolean>;

    isResizeImageAvailable(queryParams: IImageQuery): Promise<boolean>;

    resizeImage(queryParams: IImageQuery): Promise<null | string>;
}
