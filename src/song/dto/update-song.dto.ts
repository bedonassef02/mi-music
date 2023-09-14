import { PartialType } from '@nestjs/mapped-types';
import { CreateSongDto } from './create-song.dto';
import { Exclude } from 'class-transformer';

export class UpdateSongDto extends PartialType(CreateSongDto) {
  @Exclude()
  image: string;
}
