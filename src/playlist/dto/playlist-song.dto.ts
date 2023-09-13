import { IsMongoId, IsNotEmpty } from 'class-validator';

export class PlaylistSongDto {
  @IsNotEmpty()
  @IsMongoId()
  song: string;
}
