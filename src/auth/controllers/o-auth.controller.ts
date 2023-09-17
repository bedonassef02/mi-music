import {
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OAuthService } from '../services/o-auth.service';
import { User } from '../../user/decorators/user.decorator';
import { UserDto } from '../dto/user.dto';
import { CookieTokenInterceptor } from '../interceptors/cookie-token.interceptor';

@Controller({ path: 'o-auth', version: '1' })
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @UseInterceptors(CookieTokenInterceptor)
  googleAuthRedirect(@User() user): Promise<UserDto> {
    return this.oauthService.googleLogin(user);
  }
}
