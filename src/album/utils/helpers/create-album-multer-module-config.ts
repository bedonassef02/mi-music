import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { uploadFileName } from '../../../utils/helpers/filename';
import { ALBUM_IMAGE_DIR } from '../constants';

export function createAlbumMulterModuleConfig(configService: ConfigService) {
  return {
    storage: diskStorage({
      destination: configService.get<string>(ALBUM_IMAGE_DIR),
      filename: uploadFileName,
    }),
  };
}
