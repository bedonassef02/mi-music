import { Injectable } from '@nestjs/common';
import { SongQueryFeature } from '../../song/dto/song-query.feature';
import { SongService } from '../../song/song.service';
import { PaginationResponseFeature } from '../../utils/features/pagination-response.feature';

@Injectable()
export class ArtistSongsService {
  constructor(private readonly songService: SongService) {}
  findAll(query: SongQueryFeature): Promise<PaginationResponseFeature> {
    return this.songService.findAll(query);
  }
}
