import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(2048)
  description: string;
}
