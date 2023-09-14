import { Body, Controller, Patch, UseInterceptors } from '@nestjs/common';
import { CookieTokenInterceptor } from '../interceptors/cookie-token.interceptor';
import { User } from '../../user/decorators/user.decorator';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UserDto } from '../dto/user.dto';
import { ChangeUsernameDto } from '../dto/change-username.dto';
import { ProfileService } from '../services/profile.service';
import { ChangeImageDto } from '../dto/change-image.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('change-password')
  @UseInterceptors(CookieTokenInterceptor)
  changePassword(
    @User('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<UserDto> {
    return this.profileService.changePassword(id, changePasswordDto);
  }

  @Patch('change-username')
  @UseInterceptors(CookieTokenInterceptor)
  changeUsername(
    @User('id') id: string,
    @Body() changeUsernameDto: ChangeUsernameDto,
  ): Promise<UserDto> {
    return this.profileService.changeUsername(id, changeUsernameDto);
  }

  // TODO: upload image
  @Patch('change-image')
  @UseInterceptors(CookieTokenInterceptor)
  changeImage(
    @User('id') id: string,
    @Body() changeUsernameDto: ChangeImageDto,
  ): Promise<UserDto> {
    return this.profileService.changeImage(id, changeUsernameDto);
  }
}
