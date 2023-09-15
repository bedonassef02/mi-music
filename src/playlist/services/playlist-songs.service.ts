import { Injectable, NotFoundException } from '@nestjs/common';
import { FindPlaylistDto } from '../dto/find-playlist.dto';
import { Playlist, PlaylistDocument } from '../entities/playlist.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class PlaylistSongsService {
  constructor(
    @InjectModel(Playlist.name) private readonly playlistModel: Model<Playlist>,
  ) {}
  async addSong(
    findPlaylistDto: FindPlaylistDto,
    song: string,
  ): Promise<PlaylistDocument> {
    const playlist: PlaylistDocument = await this.findOne(findPlaylistDto);
    if (!playlist.songs.includes(song)) {
      playlist.songs.push(song);
      return playlist.save();
    }

    return playlist;
  }

  async removeSong(
    findPlaylistDto: FindPlaylistDto,
    song: string,
  ): Promise<PlaylistDocument> {
    const playlist: PlaylistDocument = await this.findOne(findPlaylistDto);

    const songIndex = playlist.songs.findIndex(
      (songId: string) => songId.toString() === song,
    );

    if (songIndex === -1) {
      throw new NotFoundException('Song not found in the playlist');
    }

    playlist.songs.splice(songIndex, 1);

    return playlist.save();
  }

  private async findOne(
    findPlaylistDto: FindPlaylistDto,
  ): Promise<PlaylistDocument> {
    const playlist: PlaylistDocument | undefined =
      await this.playlistModel.findOne(findPlaylistDto);
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    return playlist;
  }

  @OnEvent('playlist.add')
  async addToPlaylist(
    findPlaylistDto: FindPlaylistDto,
    song: string,
  ): Promise<void> {
    const historyPlaylist: PlaylistDocument = await this.playlistModel.findOne({
      user: findPlaylistDto.user,
      name: findPlaylistDto.name,
    });
    findPlaylistDto._id = historyPlaylist.id;
    await this.addSong(findPlaylistDto, song);
  }
}
