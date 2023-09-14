import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeImageDto {
  @IsNotEmpty()
  @IsString()
  image: string;
}
