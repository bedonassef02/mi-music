import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { uploadFileName } from '../../../utils/helpers/filename';

export function createMulterModuleConfig(configService: ConfigService) {
  return {
    storage: diskStorage({
      destination: configService.get<string>('USER_IMAGE_DIR'),
      filename: uploadFileName,
    }),
  };
}
