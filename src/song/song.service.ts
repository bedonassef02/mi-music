import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Song, SongDocument } from './entities/song.entity';
import { Model } from 'mongoose';
import { SongQueryFeature } from './dto/song-query.feature';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private readonly songModel: Model<Song>,
  ) {}
  create(createSongDto: CreateSongDto): Promise<SongDocument> {
    return this.songModel.create(createSongDto);
  }

  findAll(query: SongQueryFeature): Promise<SongDocument[]> {
    return this.songModel
      .find({ $or: query.searchQuery })
      .select(query.fields)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort);
  }

  // TODO: add to history playlist using event listener
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
}
