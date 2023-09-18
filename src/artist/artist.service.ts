import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Artist } from './entities/artist.entity';
import { Model } from 'mongoose';
import { ArtistQueryFeature } from './dto/artist-query.feature';
import { PaginationResponseFeature } from '../utils/features/pagination-response.feature';
import { paginationDetails } from '../utils/helpers/pagination-details';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private readonly artistModel: Model<Artist>,
  ) {}
  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistModel.create(createArtistDto);
  }

  async findAll(query: ArtistQueryFeature): Promise<PaginationResponseFeature> {
    const artists: Artist[] = await this.artistModel
      .find({ $or: query.searchQuery })
      .select(query.fields)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort);
    const totalItems: number = await this.totalItems(query.searchQuery);
    return paginationDetails(query, artists, totalItems);
  }

  findOne(id: string): Promise<Artist | undefined> {
    return this.artistModel.findById(id);
  }

  update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | undefined> {
    return this.artistModel.findByIdAndUpdate(id, updateArtistDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<void> {
    await this.artistModel.findByIdAndRemove(id);
  }

  private async totalItems(searchQuery: any): Promise<number> {
    return this.artistModel.countDocuments({ $or: searchQuery });
  }
}
