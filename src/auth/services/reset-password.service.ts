import { Injectable, NotFoundException } from '@nestjs/common';
import { ForgetPasswordDto } from '../dto/forget-password.dto';
import { UserDocument } from '../../user/entities/user.entity';
import { SendResetPasswordEmailDto } from '../../email/dto/send-reset-password-email.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from '../entities/token.entity';
import { Model } from 'mongoose';
import { plainIntoUserDto } from '../utils/helpers/plain-into-user-dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
  ) {}

  async sendEmailResetPassword(
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<void> {
    const user: UserDocument | undefined = await this.userService.findByEmail(
      forgetPasswordDto.email,
    );
    if (!user) {
      throw new NotFoundException('this email not exist');
    }
    const token: string = this.jwtService.sign({ email: user.email });
    const sendResetPasswordEmailDto: SendResetPasswordEmailDto = {
      user: user.id,
      token,
      email: user.email,
    };
    await this.tokenModel.create(sendResetPasswordEmailDto);
    this.eventEmitter.emit('reset-password', sendResetPasswordEmailDto);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<UserDto> {
    this.passwordService.isSameNewPasswords(resetPasswordDto);
    resetPasswordDto.newPassword = await this.passwordService.hashPassword(
      resetPasswordDto.newPassword,
    );
    const user: UserDocument = await this.userService.changePassword(
      resetPasswordDto.user,
      resetPasswordDto.newPassword,
    );
    return this.generateResponse(user);
  }

  private generateResponse(user: UserDocument): UserDto {
    const result = plainIntoUserDto(user);
    result.token = this.jwtService.sign(result.user);
    return result;
  }
}
