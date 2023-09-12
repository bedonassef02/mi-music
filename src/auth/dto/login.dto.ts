import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(32)
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  password: string;
}
