import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNotEmpty()
  email: string;
}
