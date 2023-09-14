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
  UsePipes,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistDocument } from './entities/playlist.entity';
import { User } from '../user/decorators/user.decorator';
import { ParseMongoIdPipe } from '../utils/pipes/is-mongo-id.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorator';
import { USER_ROLES } from '../auth/utils/types/user-role';
import { imageTypeValidation } from '../utils/validation/image-type.validation';
@Controller({ path: 'playlist', version: '1' })
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
  @UsePipes(ParseMongoIdPipe)
  findOne(@Param('id') _id: string, @User('id') user: string) {
    return this.playlistService.findOne({ _id, user });
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) _id: string,
    @User('id') user: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<PlaylistDocument | undefined> {
    return this.playlistService.update({ _id, user }, updatePlaylistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(ParseMongoIdPipe)
  async remove(
    @User('id') user: string,
    @Param('id') _id: string,
  ): Promise<void> {
    await this.playlistService.remove({ _id, user });
  }

  @Patch(':id/change-image')
  @Roles(USER_ROLES.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  changeImage(
    @Param('id', ParseMongoIdPipe) _id: string,
    @User('id') user: string,
    @UploadedFile(new ParseFilePipe(imageTypeValidation()))
    image: Express.Multer.File,
  ): Promise<PlaylistDocument | undefined> {
    return this.playlistService.update(
      { _id, user },
      { image: image.filename },
    );
  }
}
