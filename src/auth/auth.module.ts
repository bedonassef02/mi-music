import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { PasswordService } from './services/password.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { IsUserUpdatedMiddleware } from './middlewares/is-user-updated.middleware';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController, ProfileController],
  providers: [AuthService, PasswordService, ProfileService],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, IsUserUpdatedMiddleware)
      .forRoutes(ProfileController);
  }
}
