import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  username: string;
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(32)
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  password: string;
}
