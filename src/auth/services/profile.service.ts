import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UserDto } from '../dto/user.dto';
import { UserDocument } from '../../user/entities/user.entity';
import { ChangeUsernameDto } from '../dto/change-username.dto';
import { UserService } from '../../user/user.service';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
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
        return this.tokenService.generateResponse(user);
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
    return this.tokenService.generateResponse(user);
  }

  async changeImage(id: string, image: string): Promise<UserDto> {
    const user: UserDocument = await this.userService.changeImage(id, image);
    return this.tokenService.generateResponse(user);
  }
}
