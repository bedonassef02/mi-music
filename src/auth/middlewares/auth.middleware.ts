import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: any, res: any, next: () => void) {
    const { token } = req.cookies;
    if (!token) {
      throw new UnauthorizedException('token is required');
    }
    req.user = await this.authService.verifyToken(token);
    next();
  }
}
