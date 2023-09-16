import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;
}
