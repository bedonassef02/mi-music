import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';

const MAX_AUDIO_SIZE = 100 * 1024 * 1024;
const ALLOWED_AUDIO_TYPES = 'mp3|mp4';
export function audioTypeValidation(): any {
  return {
    validators: [
      new MaxFileSizeValidator({ maxSize: MAX_AUDIO_SIZE }),
      new FileTypeValidator({ fileType: ALLOWED_AUDIO_TYPES }),
    ],
  };
}
