import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { SendResetPasswordEmailDto } from './dto/send-reset-password-email.dto';
// TODO: make good style
@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  @OnEvent('email.login')
  async handleLoginEvent(email: string): Promise<void> {
    const subject = 'Login Alert';
    const text = `Someone has logged into your mi-music account. If this was not you, please change your password immediately.`;

    await this.sendMail(email, subject, text);
  }

  @OnEvent('email.register')
  async handleRegisterEvent(email: string): Promise<void> {
    const subject = 'Welcome to mi-music';
    const text =
      'Welcome to mi-music! You can now send messages anonymously and receive messages.';

    await this.sendMail(email, subject, text);
  }

  @OnEvent('reset-password')
  async handleResetPassword(
    sendResetPasswordEmailDto: SendResetPasswordEmailDto,
  ) {
    const appUrl = this.configService.get<string>('APP_URL');
    const url = `${appUrl}/auth/reset-password/${sendResetPasswordEmailDto.user}/${sendResetPasswordEmailDto.token}`;
    const { email } = sendResetPasswordEmailDto;
    const subject = 'Reset mi-account Password';
    const text = `if not u don't share this link with anyone, <a href="${url}">Click here</a>`;
    await this.sendMail(email, subject, text);
  }
  async sendMail(email: string, subject: string, text: string): Promise<void> {
    await this.mailerService.sendMail({
      from: this.configService.get<string>('APP_EMAIL_PASSWORD'),
      to: email,
      subject,
      html: `<h2>${text}</h2>`,
    });
  }
}
