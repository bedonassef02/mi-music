import {
  BadRequestException,
  ConflictException,
  Injectable,
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
  // TODO: inject userService & jwtService into constructor

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
    const result: UserDto = plainIntoUserDto(user);
    result.token = this.jwtService.sign(result.user);
    return result;
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
      const result: UserDto = plainIntoUserDto(user);
      result.token = this.jwtService.sign(result.user);
      return result;
    }
    throw new BadRequestException('email or password not match our records');
  }

  changePassword(changePasswordDto: ChangePasswordDto) {
    
  }

  changeUsername(changeUsernameDto: ChangeUsernameDto) {}

  private async isUserExist(email: string): Promise<true> {
    const user: UserDocument | undefined = await this.userService.findByEmail(
      email,
    );
    if (user) {
      throw new ConflictException('this email is already in use');
    }
    return true;
  }
}
