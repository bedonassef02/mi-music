import { Expose } from 'class-transformer';
import { QueryFeature } from '../../utils/features/query.feature';

export class AlbumQueryFeature extends QueryFeature {
  @Expose({ name: 'skip' })
  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  @Expose({ name: 'searchQuery' })
  get searchQuery(): any {
    return [{ name: { $regex: this.search, $options: 'i' } }];
  }
  // TODO: make filter for releaseYear[gte]=2015
}
