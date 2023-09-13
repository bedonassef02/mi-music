import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistDocument } from './entities/playlist.entity';
import { AddSongToPlaylistDto } from './dto/add-song-to-playlist.dto';

// TODO: Add user to dto
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(
    @Body() createPlaylistDto: CreatePlaylistDto,
  ): Promise<PlaylistDocument> {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  findAll(): Promise<PlaylistDocument[]> {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PlaylistDocument | undefined> {
    return this.playlistService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<PlaylistDocument | undefined> {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.playlistService.remove(id);
  }

  @Post(':id/songs')
  async addToPlaylist(
    @Req() request: any,
    @Body() addSongToPlaylistDto: AddSongToPlaylistDto,
    @Param('id') id: string,
  ): Promise<PlaylistDocument> {
    addSongToPlaylistDto.user = request.user.id;
    addSongToPlaylistDto.playlist = id;
    return this.playlistService.addToPlaylist(addSongToPlaylistDto);
  }
}
