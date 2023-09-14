import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = 'png|jpg|jpeg';
export function imageTypeValidation(): any {
  return {
    validators: [
      new MaxFileSizeValidator({ maxSize: MAX_IMAGE_SIZE }),
      new FileTypeValidator({ fileType: ALLOWED_IMAGE_TYPES }),
    ],
  };
}
