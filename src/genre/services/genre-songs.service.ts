import { Injectable } from '@nestjs/common';
import { SongService } from '../../song/song.service';
import { SongDocument } from '../../song/entities/song.entity';
import { SongQueryFeature } from '../../song/dto/song-query.feature';

@Injectable()
export class GenreSongsService {
  constructor(private readonly songService: SongService) {}
  findAll(query: SongQueryFeature): Promise<SongDocument[]> {
    return this.songService.findAll(query);
  }
}
