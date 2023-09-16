import {
  IsMongoId,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @ApiProperty()
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
