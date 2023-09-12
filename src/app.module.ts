import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongModule } from './song/song.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [SongModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
