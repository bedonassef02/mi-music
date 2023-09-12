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

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto): Promise<SongDocument> {
    return this.songService.create(createSongDto);
  }

  @Get()
  findAll(): Promise<SongDocument[]> {
    return this.songService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SongDocument | undefined> {
    return this.songService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<SongDocument | undefined> {
    return this.songService.update(id, updateSongDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.songService.remove(id);
  }
}
