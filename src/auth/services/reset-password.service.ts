import { Injectable, NotFoundException } from '@nestjs/common';
import { ForgetPasswordDto } from '../dto/forget-password.dto';
import { UserDocument } from '../../user/entities/user.entity';
import { SendResetPasswordEmailDto } from '../../email/dto/send-reset-password-email.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../../user/user.service';
import { PasswordService } from './password.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from '../entities/token.entity';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
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
    const token: string = this.tokenService.generateToken({
      email: user.email,
    });
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
    return this.tokenService.generateResponse(user);
  }
}
