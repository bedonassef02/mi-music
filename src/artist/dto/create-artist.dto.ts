import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;
}
