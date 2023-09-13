import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Playlist, PlaylistDocument } from './entities/playlist.entity';
import { Model } from 'mongoose';
import { AddSongToPlaylistDto } from './dto/add-song-to-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel(Playlist.name) private readonly playlistModel: Model<Playlist>,
  ) {}

  // TODO: create a playlist history for each user when sign up
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

  async addToPlaylist(
    addSongToPlaylistDto: AddSongToPlaylistDto,
  ): Promise<PlaylistDocument> {
    const playlist: PlaylistDocument = await this.findOne(
      addSongToPlaylistDto.playlist,
    );
    if (playlist.songs) {
      const isSongExist = playlist.songs.filter((song) => song !== song);
      if (!isSongExist) {
        playlist.songs.push(addSongToPlaylistDto.song);
        await playlist.save();
        return playlist;
      }
    }
  }

  async removeFromPlaylist(
    id: string,
    song: string,
  ): Promise<PlaylistDocument> {
    const playlist: PlaylistDocument = await this.findOne(id);
    if (playlist.songs) {
      playlist.songs = playlist.songs.filter((song) => song !== song);
      await playlist.save();
      return playlist;
    }
  }
}
