import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { User } from '../../user/decorators/user.decorator';
import { PlaylistSongDto } from '../dto/playlist-song.dto';
import { PlaylistDocument } from '../entities/playlist.entity';
import { PlaylistSongsService } from '../services/playlist-songs.service';
import { ParseMongoIdPipe } from '../../utils/pipes/is-mongo-id.pipe';

@Controller({ path: 'playlist/:id/songs', version: '1' })
export class PlaylistSongsController {
  constructor(private readonly playlistSongsService: PlaylistSongsService) {}
  @Post()
  @UsePipes(ParseMongoIdPipe)
  async addSong(
    @Param('id') _id: string,
    @User('id') user: string,
    @Body() addSongDto: PlaylistSongDto,
  ): Promise<PlaylistDocument> {
    return this.playlistSongsService.addSong({ _id, user }, addSongDto.song);
  }

  @Delete()
  @UsePipes(ParseMongoIdPipe)
  async removeSong(
    @Param('id') _id: string,
    @User('id') user: string,
    @Body() removeSongDto: PlaylistSongDto,
  ): Promise<PlaylistDocument> {
    return this.playlistSongsService.removeSong(
      { _id, user },
      removeSongDto.song,
    );
  }
}
