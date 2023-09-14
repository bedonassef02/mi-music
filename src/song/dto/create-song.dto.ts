import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSongDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 64)
  name: string;
  @IsOptional()
  @IsMongoId({ each: true })
  artists: 'UnKnown';
  @IsNotEmpty()
  @IsMongoId()
  genre: string;
  @IsOptional()
  @IsNumber()
  // TODO: make years as enum
  @Min(1960)
  @Max(2023)
  releaseYear: number;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Max(100)
  @Min(0)
  duration: number;
  @IsOptional()
  @IsString()
  audio: string;
}
