import multer from 'multer';

const uploadImage = multer({ dest: './src/public/images/origin' });

export default uploadImage;
