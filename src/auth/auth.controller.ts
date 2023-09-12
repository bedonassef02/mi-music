import { Controller, Post, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeUsernameDto } from './dto/change-username.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Patch('change-password')
  changePassword(changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @Patch('change-username')
  changeUsername(changeUsernameDto: ChangeUsernameDto) {
    return this.authService.changeUsername(changeUsernameDto);
  }
}
