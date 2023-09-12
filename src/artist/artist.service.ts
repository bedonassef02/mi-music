import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from './entities/artist.entity';
import { Model } from 'mongoose';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private readonly artistModel: Model<Artist>,
  ) {}
  create(createArtistDto: CreateArtistDto): Promise<ArtistDocument> {
    return this.artistModel.create(createArtistDto);
  }

  findAll(): Promise<ArtistDocument[]> {
    return this.artistModel.find();
  }

  findOne(id: string): Promise<ArtistDocument | undefined> {
    return this.artistModel.findById(id);
  }

  update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistDocument | undefined> {
    return this.artistModel.findByIdAndUpdate(id, updateArtistDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<void> {
    await this.artistModel.findByIdAndRemove(id);
  }
}
