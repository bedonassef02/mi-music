import { Genre } from '../../genre/entities/genre.entity';
import { QueryFeature } from '../features/query.feature';
import { Artist } from '../../artist/entities/artist.entity';
import { Song } from '../../song/entities/song.entity';
import { Album } from '../../album/entities/album.entity';
import { PaginationResponseFeature } from '../features/pagination-response.feature';

type dataType = Genre[] | Artist[] | Song[] | Album[];

export function paginationDetails(
  query: QueryFeature,
  data: dataType,
  totalItems: number,
): PaginationResponseFeature {
  const totalPages = Math.ceil(totalItems / query.limit);

  return {
    page: query.page,
    totalItems,
    pageSize: query.limit,
    totalPages,
    data,
  };
}
