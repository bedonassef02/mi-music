import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  currentPassword: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  newPassword: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  confirmPassword: string;
}
