import {
  Controller,
  Post,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeUsernameDto } from './dto/change-username.dto';
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

  @Patch('change-password')
  @UseInterceptors(CookieTokenInterceptor)
  changePassword(
    @Req() req: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<UserDto> {
    const { id } = req.user;
    return this.authService.changePassword(id, changePasswordDto);
  }

  @Patch('change-username')
  @UseInterceptors(CookieTokenInterceptor)
  changeUsername(
    @Req() req: any,
    @Body() changeUsernameDto: ChangeUsernameDto,
  ): Promise<UserDto> {
    const { id } = req.user;
    return this.authService.changeUsername(id, changeUsernameDto);
  }

  // TODO: implement reset password
}
