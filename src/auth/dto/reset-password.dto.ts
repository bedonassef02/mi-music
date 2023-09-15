import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Exclude } from 'class-transformer';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  newPassword: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  confirmPassword: string;
  @Exclude()
  user: string;
  @Exclude()
  token: string;
}
