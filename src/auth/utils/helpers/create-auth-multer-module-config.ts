import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { uploadFileName } from '../../../utils/helpers/filename';
import { USER_IMAGE_DIR } from '../constants';

export function createAuthMulterModuleConfig(configService: ConfigService) {
  return {
    storage: diskStorage({
      destination: configService.get<string>(USER_IMAGE_DIR),
      filename: uploadFileName,
    }),
  };
}
