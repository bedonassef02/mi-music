import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsMongoId()
  artist: string;
  @IsOptional()
  @IsNumber()
  @Min(1960)
  @Max(2023)
  releaseYear: string;
}
