import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeUsernameDto } from './dto/change-username.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './services/password.service';
import { UserDocument } from '../user/entities/user.entity';
import { plainIntoUserDto } from './utils/helpers/plain-into-user-dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserDto> {
    await this.isUserExist(registerDto.email);
    registerDto.password = await this.passwordService.hashPassword(
      registerDto.password,
    );
    const user: UserDocument = await this.userService.create(registerDto);
    return this.generateResponse(user);
  }

  async login(loginDto: LoginDto) {
    const user: UserDocument | undefined = await this.userService.findByEmail(
      loginDto.email,
    );
    if (
      user &&
      (await this.passwordService.comparePassword(
        loginDto.password,
        user.password,
      ))
    ) {
      return this.generateResponse(user);
    }
    throw new BadRequestException('email or password not match our records');
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<UserDto> {
    if (changePasswordDto.newPassword === changePasswordDto.confirmPassword) {
      const user: UserDocument = await this.userService.findOne(id);
      if (
        await this.passwordService.comparePassword(
          changePasswordDto.newPassword,
          user.password,
        )
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
    throw new BadRequestException('new password not match confirm password');
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

  verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new BadRequestException('token is not valid');
    }
  }

  private async isUserExist(email: string): Promise<true> {
    const user: UserDocument | undefined = await this.userService.findByEmail(
      email,
    );
    if (user) {
      throw new ConflictException('this email is already in use');
    }
    return true;
  }

  private generateResponse(user: UserDocument): UserDto {
    const result = plainIntoUserDto(user);
    result.token = this.jwtService.sign(result.user);
    return result;
  }
}
