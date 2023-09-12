import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumDocument } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumDocument> {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll(): Promise<AlbumDocument[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AlbumDocument | undefined> {
    return this.albumService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumDocument | undefined> {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.albumService.remove(id);
  }
}
