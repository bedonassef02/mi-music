import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from '../entities/token.entity';
import { Model } from 'mongoose';

@Injectable()
export class ValidateResetTokenInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const { token, user } = request.params;

    // Verify the JWT token
    if (!this.jwtService.verify(token)) {
      throw new BadRequestException('Invalid token');
    }

    // Check if the token exists in the database
    const isTokenExist: TokenDocument | undefined =
      await this.tokenModel.findOne({
        token,
      });

    if (!isTokenExist) {
      throw new BadRequestException('Token expired or invalid');
    }

    return next.handle().pipe(
      tap(async (data) => {
        if (data && data.token) {
          await this.tokenModel.findOneAndRemove({ user, token });
        }
      }),
    );
  }
}
