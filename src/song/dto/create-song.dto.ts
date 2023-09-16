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
import { ApiProperty } from "@nestjs/swagger";

export class CreateSongDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 64)
  name: string;
  @ApiProperty()
  @IsOptional()
  @IsMongoId({ each: true })
  artists: 'UnKnown';
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  genre: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1960)
  @Max(2023)
  releaseYear: number;
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Max(100)
  @Min(0)
  duration: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  audio: string;
}
