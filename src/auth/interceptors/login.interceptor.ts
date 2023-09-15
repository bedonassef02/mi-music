import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(async (data) => {
        const response = context.switchToHttp().getResponse();
        if (response.statusCode === HttpStatus.OK) {
          await this.eventEmitter.emitAsync('email.login', data.user.email);
        }
      }),
    );
  }
}
