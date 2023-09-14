import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongDocument } from './entities/song.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { USER_ROLES } from '../auth/utils/types/user-role';
import { Public } from '../auth/decorators/public.decorator';
import { SongQueryFeature } from './dto/song-query.feature';
import { ParseMongoIdPipe } from '../utils/pipes/is-mongo-id.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageTypeValidation } from '../utils/validation/image-type.validation';
import { audioTypeValidation } from '../utils/validation/audio-type.valiadtion';

@Controller({ path: 'song', version: '1' })
export class SongController {
  constructor(private readonly songService: SongService) {}
  @Post()
  @Roles(USER_ROLES.ADMIN)
  @UseInterceptors(FileInterceptor('audio'))
  create(
    @Body() createSongDto: CreateSongDto,
    @UploadedFile(new ParseFilePipe(audioTypeValidation()))
    audio: Express.Multer.File,
  ): Promise<SongDocument> {
    createSongDto.audio = audio.filename;
    return this.songService.create(createSongDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: SongQueryFeature): Promise<SongDocument[]> {
    return this.songService.findAll(query);
  }

  @Get(':id')
  @Public()
  @UsePipes(ParseMongoIdPipe)
  findOne(@Param('id') id: string): Promise<SongDocument | undefined> {
    return this.songService.findOne(id);
  }

  @Patch(':id')
  @Roles(USER_ROLES.ADMIN)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<SongDocument | undefined> {
    return this.songService.update(id, updateSongDto);
  }

  @Delete(':id')
  @Roles(USER_ROLES.ADMIN)
  @UsePipes(ParseMongoIdPipe)
  async remove(@Param('id') id: string): Promise<void> {
    await this.songService.remove(id);
  }

  @Patch(':id/change-image')
  @Roles(USER_ROLES.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  changeImage(
    @Param('id', ParseMongoIdPipe) id: string,
    @UploadedFile(new ParseFilePipe(imageTypeValidation()))
    image: Express.Multer.File,
  ): Promise<any | undefined> {
    return this.songService.update(id, { image: image.filename });
  }
}
