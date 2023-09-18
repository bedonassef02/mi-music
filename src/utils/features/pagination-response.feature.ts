import { SongDocument } from '../../song/entities/song.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { GenreDocument } from '../../genre/entities/genre.entity';
import { Album } from '../../album/entities/album.entity';

export class PaginationResponseFeature {
  page: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  data: SongDocument[] | Artist[] | GenreDocument[] | Album[];
}
