import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Song, SongDocument } from './entities/song.entity';
import { Model } from 'mongoose';
import { SongQueryFeature } from './dto/song-query.feature';
import { paginationDetails } from '../utils/helpers/pagination-details';
import { PaginationResponseFeature } from '../utils/features/pagination-response.feature';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private readonly songModel: Model<Song>,
  ) {}
  create(createSongDto: CreateSongDto): Promise<SongDocument> {
    return this.songModel.create(createSongDto);
  }

  async findAll(query: SongQueryFeature): Promise<PaginationResponseFeature> {
    const filter = this.filter(query);
    const songs: SongDocument[] = await this.songModel
      .find(filter)
      .select(query.fields)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort);
    const totalItems: number = await this.totalItems(filter);
    return paginationDetails(query, songs, totalItems);
  }

  findOne(id: string): Promise<SongDocument | undefined> {
    return this.songModel.findById(id);
  }

  update(
    id: string,
    updateSongDto: UpdateSongDto,
  ): Promise<SongDocument | undefined> {
    return this.songModel.findByIdAndUpdate(id, updateSongDto, { new: true });
  }

  async remove(id: string): Promise<void> {
    await this.songModel.findByIdAndRemove(id);
  }

  private filter(query: SongQueryFeature): any {
    const filter: any = {
      $or: query.searchQuery,
    };
    if (query.genre) {
      filter.genre = query.genre;
    }
    if (query.artist) {
      filter.artist = { $elemMatch: { $eq: query.artist } };
    }
    if (query.album) {
      filter.album = query.album;
    }
    return filter;
  }

  private async totalItems(searchQuery: any): Promise<number> {
    return this.songModel.countDocuments(searchQuery);
  }
}
