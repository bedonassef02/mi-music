import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(32)
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  password: string;
}
