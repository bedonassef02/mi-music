import { Expose } from 'class-transformer';
import { QueryFeature } from '../../utils/features/query.feature';
import { IsMongoId, IsOptional } from 'class-validator';

export class SongQueryFeature extends QueryFeature {
  @Expose({ name: 'skip' })
  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  @Expose({ name: 'searchQuery' })
  get searchQuery(): any {
    return [{ name: { $regex: this.search, $options: 'i' } }];
  }

  @IsOptional()
  @IsMongoId()
  genre?: string;
  @IsOptional()
  @IsMongoId()
  artist?: string;
}
