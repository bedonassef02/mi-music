import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { uploadFileName } from '../../../utils/helpers/filename';
import { PLAYLIST_IMAGE_DIR } from '../constants';

export function createPlaylistMulterModuleConfig(configService: ConfigService) {
  return {
    storage: diskStorage({
      destination: configService.get<string>(PLAYLIST_IMAGE_DIR),
      filename: uploadFileName,
    }),
  };
}
