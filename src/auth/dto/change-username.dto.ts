import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUsernameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  username: string;
}
