import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  currentPassword: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  newPassword: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  confirmPassword: string;
}
