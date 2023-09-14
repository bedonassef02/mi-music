import {
  IsMongoId,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePlaylistDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 128)
  @IsNotIn(['history', 'favorite'])
  name: string;
  @IsOptional()
  @IsMongoId({ each: true })
  songs?: string;
  @IsOptional()
  @IsMongoId()
  user: string;
}
