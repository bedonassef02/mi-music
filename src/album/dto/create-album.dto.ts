import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  artist: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1960)
  @Max(2023)
  releaseYear: string;
}
