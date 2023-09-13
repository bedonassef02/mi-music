import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistDto } from './create-playlist.dto';
import { Exclude } from 'class-transformer';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @Exclude()
  user: string;
}
