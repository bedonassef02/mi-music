import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { MulterModule } from '@nestjs/platform-express';
import { createJwtModuleConfig } from './utils/helpers/create-jwt-module-config';
import { createAuthMulterModuleConfig } from './utils/helpers/create-auth-multer-module-config';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './entities/token.entity';
import { ResetPasswordService } from './services/reset-password.service';
import { ResetPasswordController } from './controllers/reset-password.controller';
import { OAuthController } from './controllers/o-auth.controller';
import { OAuthService } from './services/o-auth.service';
import { GoogleStrategy } from './strategies/google-srategy';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: createJwtModuleConfig,
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: createAuthMulterModuleConfig,
    }),
    UserModule,
  ],
  controllers: [
    AuthController,
    ProfileController,
    ResetPasswordController,
    OAuthController,
  ],
  providers: [
    AuthService,
    PasswordService,
    ProfileService,
    ResetPasswordService,
    GoogleStrategy,
    OAuthService,
  ],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, IsUserUpdatedMiddleware)
      .forRoutes(ProfileController);
  }
}
