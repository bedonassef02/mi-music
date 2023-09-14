import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from './entities/playlist.entity';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { IsUserUpdatedMiddleware } from '../auth/middlewares/is-user-updated.middleware';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { PlaylistSongsController } from './controllers/playlist-songs.controller';
import { PlaylistSongsService } from './services/playlist-songs.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createPlaylistMulterModuleConfig } from './utils/helpers/create-playlist-multer-module-config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Playlist.name, schema: PlaylistSchema },
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: createPlaylistMulterModuleConfig,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [PlaylistController, PlaylistSongsController],
  providers: [PlaylistService, PlaylistSongsService],
})
export class PlaylistModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, IsUserUpdatedMiddleware)
      .forRoutes(PlaylistController, PlaylistSongsController);
  }
}
