import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongModule } from './song/song.module';
import { ArtistModule } from './artist/artist.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PlaylistModule } from './playlist/playlist.module';
import { GenreModule } from './genre/genre.module';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    SongModule,
    ArtistModule,
    PlaylistModule,
    GenreModule,
    AlbumModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
