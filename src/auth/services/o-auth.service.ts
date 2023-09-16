import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { UserDocument } from '../../user/entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { plainIntoUserDto } from '../utils/helpers/plain-into-user-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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
    return this.generateResponse(user);
  }

  async login(email: string): Promise<UserDto> {
    const user: UserDocument = await this.userService.findByEmail(email);
    return this.generateResponse(user);
  }

  private generateResponse(user: UserDocument): UserDto {
    const result = plainIntoUserDto(user);
    result.token = this.jwtService.sign(result.user);
    return result;
  }
}
