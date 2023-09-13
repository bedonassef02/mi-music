import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistDocument } from './entities/playlist.entity';
import { User } from '../user/decorators/user.decorator';
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(
    @User('id') user: string,
    @Body() createPlaylistDto: CreatePlaylistDto,
  ): Promise<PlaylistDocument> {
    createPlaylistDto.user = user;
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  findAll(@User('id') user: string): Promise<PlaylistDocument[]> {
    return this.playlistService.findAll({ user });
  }

  @Get(':id')
  findOne(@Param('id') _id: string, @User('id') user: string) {
    return this.playlistService.findOne({ _id, user });
  }

  // TODO: make guard to check if this is for same user
  @Patch(':id')
  update(
    @Param('id') _id: string,
    @User('id') user: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<PlaylistDocument | undefined> {
    return this.playlistService.update({ _id, user }, updatePlaylistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @User('id') user: string,
    @Param('id') _id: string,
  ): Promise<void> {
    await this.playlistService.remove({ _id, user });
  }
}
