import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist, PlaylistDocument } from './entities/playlist.entity';
import { Model } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';
import { FindPlaylistDto } from './dto/find-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private readonly playlistModel: Model<Playlist>,
  ) {}

  @OnEvent('playlist.create')
  create(createPlaylistDto: CreatePlaylistDto): Promise<PlaylistDocument> {
    return this.playlistModel.create(createPlaylistDto);
  }

  findAll(findPlaylistDto: FindPlaylistDto): Promise<PlaylistDocument[]> {
    return this.playlistModel.find(findPlaylistDto);
  }

  async findOne(findPlaylistDto: FindPlaylistDto): Promise<PlaylistDocument> {
    const playlist: PlaylistDocument | undefined = await this.playlistModel
      .findOne(findPlaylistDto)
      .populate({
        path: 'songs',
        select: 'name duration',
      });
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    return playlist;
  }

  async update(
    findPlaylistDto: FindPlaylistDto,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<PlaylistDocument | undefined> {
    const playlist: PlaylistDocument | undefined =
      await this.playlistModel.findOneAndUpdate(
        findPlaylistDto,
        updatePlaylistDto,
        {
          new: true,
        },
      );
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    return playlist;
  }

  async remove(findPlaylistDto: FindPlaylistDto): Promise<void> {
    if (!(await this.playlistModel.findOneAndRemove(findPlaylistDto))) {
      throw new NotFoundException('Playlist not found');
    }
  }
}
