import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FindPlaylistDto } from '../../playlist/dto/find-playlist.dto';

@Injectable()
export class AddSongHistoryPlaylistInterceptor implements NestInterceptor {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const findPlaylistDto: FindPlaylistDto = {
          user: user.id,
          name: 'history',
        };
        this.eventEmitter.emit('playlist.add', findPlaylistDto, data._id);
      }),
    );
  }
}
