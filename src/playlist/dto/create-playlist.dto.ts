import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePlaylistDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 128)
  name: string;
  @IsNotEmpty()
  @IsMongoId({ each: true })
  songs: string;
}
