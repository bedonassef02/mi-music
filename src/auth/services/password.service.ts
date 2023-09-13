import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from '../dto/change-password.dto';
@Injectable()
export class PasswordService {
  private readonly SALT: number = 12;
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  isNewPasswordChanged(changePasswordDto: ChangePasswordDto): boolean {
    if (changePasswordDto.currentPassword === changePasswordDto.newPassword) {
      throw new BadRequestException(
        'cant change password to same prev password',
      );
    }
    return true;
  }

  isSameNewPasswords(changePasswordDto: ChangePasswordDto) {
    if (changePasswordDto.newPassword === changePasswordDto.confirmPassword) {
      return true;
    }
    throw new BadRequestException('new password not match confirm password');
  }
}
