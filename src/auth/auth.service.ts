import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeUsernameDto } from './dto/change-username.dto';

@Injectable()
export class AuthService {
  // TODO: inject userService & jwtService into constructor
  register(registerDto: RegisterDto) {}
  login(loginDto: LoginDto) {}

  changePassword(changePasswordDto: ChangePasswordDto) {}
  changeUsername(changeUsernameDto: ChangeUsernameDto) {}
}
