import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
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
  @Exclude()
  user: string;
  @Exclude()
  token: string;
}
