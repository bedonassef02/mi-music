import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { UserDocument } from '../../user/entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { TokenService } from './token.service';

@Injectable()
export class OAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async googleLogin(user: any) {
    if (!user) {
      throw new BadRequestException('no user from google');
    }
    const dbUser: UserDocument | undefined = await this.userService.findByEmail(
      user.email,
    );
    if (!dbUser) {
      const username = user.firstName + ' ' + user.lastName;
      return await this.register(user.email, username);
    }
    return await this.login(user.email);
  }

  async register(email: string, username: string): Promise<UserDto> {
    const user: UserDocument = await this.userService.create({
      email,
      username,
    });
    return this.tokenService.generateResponse(user);
  }

  async login(email: string): Promise<UserDto> {
    const user: UserDocument = await this.userService.findByEmail(email);
    return this.tokenService.generateResponse(user);
  }
}
