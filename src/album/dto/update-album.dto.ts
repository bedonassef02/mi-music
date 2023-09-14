import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { Exclude } from 'class-transformer';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @Exclude()
  image: string;
}
