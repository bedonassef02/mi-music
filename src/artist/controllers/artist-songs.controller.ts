import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArtistSongsService } from '../services/artist-songs.service';
import { SongQueryFeature } from '../../song/dto/song-query.feature';
import { ParseMongoIdPipe } from '../../utils/pipes/is-mongo-id.pipe';
import { SongDocument } from '../../song/entities/song.entity';

@Controller({ path: 'artist/:id/songs', version: '1' })
export class ArtistSongsController {
  constructor(private readonly artistSongsService: ArtistSongsService) {}

  @Get()
  findAll(
    @Query() query: SongQueryFeature,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<SongDocument[]> {
    query.artist = id;
    return this.artistSongsService.findAll(query);
  }
}
