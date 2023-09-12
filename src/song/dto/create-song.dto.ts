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
  @Min(1960)
  @Max(2023)
  releaseYear: number;
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @Min(0)
  duration: number;
  @IsNotEmpty()
  @IsString()
  fileName: string;
  @IsOptional()
  @IsString()
  image: string;
}
