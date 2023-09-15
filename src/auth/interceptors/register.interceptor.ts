import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatePlaylistDto } from '../../playlist/dto/create-playlist.dto';

@Injectable()
export class RegisterInterceptor implements NestInterceptor {
  constructor(private eventEmitter: EventEmitter2) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();
        if (response.statusCode === HttpStatus.CREATED) {
          this.eventEmitter.emit('email.register', data.user.email);
          this.createDefaultPlaylist(data.user.id);
        }
      }),
    );
  }

  private createDefaultPlaylist(id: string) {
    const createPlaylistDto: CreatePlaylistDto = {
      user: id,
      name: 'history',
    };
    this.eventEmitter.emitAsync('playlist.create', createPlaylistDto).then();
    createPlaylistDto.name = 'favorite';
    this.eventEmitter.emitAsync('playlist.create', createPlaylistDto).then();
  }
}
