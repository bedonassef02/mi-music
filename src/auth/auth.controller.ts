import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { CookieTokenInterceptor } from './interceptors/cookie-token.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(CookieTokenInterceptor)
  register(@Body() registerDto: RegisterDto): Promise<UserDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CookieTokenInterceptor)
  login(@Body() loginDto: LoginDto): Promise<UserDto> {
    return this.authService.login(loginDto);
  }

  // TODO: implement reset password
}
