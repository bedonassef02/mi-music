import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { uploadFileName } from '../../../utils/helpers/filename';
import { SONG_IMAGE_DIR } from '../constants';

export function createSongMulterModuleConfig(configService: ConfigService) {
  return {
    storage: diskStorage({
      destination: configService.get<string>(SONG_IMAGE_DIR),
      filename: uploadFileName,
    }),
  };
}
