import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2048)
  description: string;
}
