import { Injectable } from '@nestjs/common';
import { SongService } from '../../song/song.service';
import { SongQueryFeature } from '../../song/dto/song-query.feature';
import { PaginationResponseFeature } from '../../utils/features/pagination-response.feature';

@Injectable()
export class GenreSongsService {
  constructor(private readonly songService: SongService) {}
  findAll(query: SongQueryFeature): Promise<PaginationResponseFeature> {
    return this.songService.findAll(query);
  }
}
