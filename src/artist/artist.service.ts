import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Artist } from './entities/artist.entity';
import { Model } from 'mongoose';
import { ArtistQueryFeature } from './dto/artist-query.feature';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private readonly artistModel: Model<Artist>,
  ) {}
  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistModel.create(createArtistDto);
  }

  findAll(query: ArtistQueryFeature): Promise<Artist[]> {
    return this.artistModel
      .find({ $or: query.searchQuery })
      .select(query.fields)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort);
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
}
