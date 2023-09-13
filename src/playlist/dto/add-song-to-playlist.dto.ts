import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class AddSongToPlaylistDto {
  @IsOptional()
  @IsMongoId()
  playlist?: string;
  @IsNotEmpty()
  @IsMongoId()
  song: string;
  @IsOptional()
  @IsMongoId()
  user?: string;
}
