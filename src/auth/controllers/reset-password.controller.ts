import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { ForgetPasswordDto } from '../dto/forget-password.dto';
import { ValidateResetTokenInterceptor } from '../interceptors/validate-reset-token.interceptor';
import { CookieTokenInterceptor } from '../interceptors/cookie-token.interceptor';
import { ParseMongoIdPipe } from '../../utils/pipes/is-mongo-id.pipe';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ResetPasswordService } from '../services/reset-password.service';
import { UserDto } from '../dto/user.dto';

@Controller({ path: 'auth/reset-password', version: '1' })
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}
  @Post('')
  async sendEmailResetPassword(
    @Body() forgetPasswordDto: ForgetPasswordDto,
  ): Promise<void> {
    await this.resetPasswordService.sendEmailResetPassword(forgetPasswordDto);
  }

  @Post(':user/:token')
  @UseInterceptors(ValidateResetTokenInterceptor, CookieTokenInterceptor)
  async resetPassword(
    @Param('user', ParseMongoIdPipe) user: string,
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<UserDto> {
    resetPasswordDto.user = user;
    resetPasswordDto.token = token;
    return await this.resetPasswordService.resetPassword(resetPasswordDto);
  }
}
