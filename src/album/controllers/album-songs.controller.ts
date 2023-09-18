import { Controller, Get, Param, Query } from '@nestjs/common';
import { SongQueryFeature } from '../../song/dto/song-query.feature';
import { ParseMongoIdPipe } from '../../utils/pipes/is-mongo-id.pipe';
import { AlbumSongsService } from '../services/album-songs.service';
import { PaginationResponseFeature } from '../../utils/features/pagination-response.feature';

@Controller({ path: 'album/:id/songs', version: '1' })
export class AlbumSongsController {
  constructor(private readonly albumSongsService: AlbumSongsService) {}

  @Get()
  findAll(
    @Query() query: SongQueryFeature,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<PaginationResponseFeature> {
    query.album = id;
    return this.albumSongsService.findAll(query);
  }
}
