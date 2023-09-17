import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './entities/album.entity';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { IsUserUpdatedMiddleware } from '../auth/middlewares/is-user-updated.middleware';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createAlbumMulterModuleConfig } from './utils/helpers/create-album-multer-module-config';
import { AlbumSongsController } from './controllers/album-songs.controller';
import { AlbumSongsService } from './services/album-songs.service';
import { SongModule } from '../song/song.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: createAlbumMulterModuleConfig,
    }),
    AuthModule,
    UserModule,
    SongModule,
  ],
  controllers: [AlbumController, AlbumSongsController],
  providers: [AlbumService, AlbumSongsService],
})
export class AlbumModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, IsUserUpdatedMiddleware)
      .forRoutes(AlbumController, AlbumSongsController);
  }
}
