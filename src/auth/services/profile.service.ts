import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UserDto } from '../dto/user.dto';
import { UserDocument } from '../../user/entities/user.entity';
import { ChangeUsernameDto } from '../dto/change-username.dto';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { plainIntoUserDto } from '../utils/helpers/plain-into-user-dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}
  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<UserDto> {
    if (
      this.passwordService.isSameNewPasswords(changePasswordDto) &&
      this.passwordService.isNewPasswordChanged(changePasswordDto)
    ) {
      const user: UserDocument | undefined = await this.userService.findOne(id);
      if (
        user &&
        (await this.passwordService.comparePassword(
          changePasswordDto.currentPassword,
          user.password,
        ))
      ) {
        changePasswordDto.newPassword = await this.passwordService.hashPassword(
          changePasswordDto.newPassword,
        );
        const user = await this.userService.changePassword(
          id,
          changePasswordDto.newPassword,
        );
        return this.generateResponse(user);
      }
      throw new UnauthorizedException('password does not match out records');
    }
  }

  async changeUsername(
    id: string,
    changeUsernameDto: ChangeUsernameDto,
  ): Promise<UserDto> {
    const user: UserDocument = await this.userService.changeUsername(
      id,
      changeUsernameDto.username,
    );
    return this.generateResponse(user);
  }

  async changeImage(id: string, image: string): Promise<UserDto> {
    const user: UserDocument = await this.userService.changeImage(id, image);
    return this.generateResponse(user);
  }

  private generateResponse(user: UserDocument): UserDto {
    const result = plainIntoUserDto(user);
    result.token = this.jwtService.sign(result.user);
    return result;
  }
}
