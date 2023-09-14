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

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  // TODO: upload audio file & image
  @Post()
  @Roles(USER_ROLES.ADMIN)
  create(@Body() createSongDto: CreateSongDto): Promise<SongDocument> {
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
}
