import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
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
  @IsNotEmpty()
  @IsNumber()
  @Min(1960)
  @Max(2023)
  releaseYear: string;
  @IsNotEmpty()
  @IsString()
  image: string;
}
