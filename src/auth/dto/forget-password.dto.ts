import { IsNotEmpty } from 'class-validator';

export class ForgetPasswordDto {
  @IsNotEmpty()
  @IsNotEmpty()
  email: string;
}
