import { Injectable } from '@nestjs/common';
import { SongQueryFeature } from '../../song/dto/song-query.feature';
import { SongService } from '../../song/song.service';
import { SongDocument } from '../../song/entities/song.entity';

@Injectable()
export class AlbumSongsService {
  constructor(private readonly songService: SongService) {}
  findAll(query: SongQueryFeature): Promise<SongDocument[]> {
    return this.songService.findAll(query);
  }
}
