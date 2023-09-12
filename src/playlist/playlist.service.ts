import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist, PlaylistDocument } from './entities/playlist.entity';
import { Model } from 'mongoose';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private readonly playlistModel: Model<Playlist>,
  ) {}
  create(createPlaylistDto: CreatePlaylistDto): Promise<PlaylistDocument> {
    return this.playlistModel.create(createPlaylistDto);
  }

  findAll(): Promise<PlaylistDocument[]> {
    return this.playlistModel.find();
  }

  findOne(id: string): Promise<PlaylistDocument | undefined> {
    return this.playlistModel.findById(id);
  }

  update(
    id: string,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<PlaylistDocument | undefined> {
    return this.playlistModel.findByIdAndUpdate(id, updatePlaylistDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<void> {
    await this.playlistModel.findByIdAndRemove(id);
  }
}
