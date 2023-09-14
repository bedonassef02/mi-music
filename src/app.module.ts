import { Module } from '@nestjs/common';
import { SongModule } from './song/song.module';
import { ArtistModule } from './artist/artist.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PlaylistModule } from './playlist/playlist.module';
import { GenreModule } from './genre/genre.module';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { configSchemaValidation } from './utils/validation/config-schema.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validationSchema: configSchemaValidation,
    }),
    EventEmitterModule.forRoot(),
    DatabaseModule,
    SongModule,
    ArtistModule,
    PlaylistModule,
    GenreModule,
    AlbumModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
