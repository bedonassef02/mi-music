import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './entities/artist.entity';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { IsUserUpdatedMiddleware } from '../auth/middlewares/is-user-updated.middleware';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ArtistSongsController } from './controllers/artist-songs.controller';
import { ArtistSongsService } from './services/artist-songs.service';
import { SongModule } from '../song/song.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    AuthModule,
    UserModule,
    SongModule,
  ],
  controllers: [ArtistController, ArtistSongsController],
  providers: [ArtistService, ArtistSongsService],
})
export class ArtistModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, IsUserUpdatedMiddleware)
      .forRoutes(ArtistController, ArtistSongsController);
  }
}
