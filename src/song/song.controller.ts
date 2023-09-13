import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongDocument } from './entities/song.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { USER_ROLES } from '../auth/utils/types/user-role';
import { Public } from '../auth/decorators/public.decorator';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  @Roles(USER_ROLES.ADMIN)
  create(@Body() createSongDto: CreateSongDto): Promise<SongDocument> {
    return this.songService.create(createSongDto);
  }

  @Get()
  @Public()
  findAll(): Promise<SongDocument[]> {
    return this.songService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<SongDocument | undefined> {
    return this.songService.findOne(id);
  }

  @Patch(':id')
  @Roles(USER_ROLES.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<SongDocument | undefined> {
    return this.songService.update(id, updateSongDto);
  }

  @Delete(':id')
  @Roles(USER_ROLES.ADMIN)
  async remove(@Param('id') id: string): Promise<void> {
    await this.songService.remove(id);
  }
}
