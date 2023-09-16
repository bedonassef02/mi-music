import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(32)
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  password?: string;
}
