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
import { USER_ROLES } from '../auth/utils/types/user-role';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @Roles(USER_ROLES.ADMIN)
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumDocument> {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @Public()
  findAll(): Promise<AlbumDocument[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<AlbumDocument | undefined> {
    return this.albumService.findOne(id);
  }

  @Patch(':id')
  @Roles(USER_ROLES.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumDocument | undefined> {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @Roles(USER_ROLES.ADMIN)
  remove(@Param('id') id: string): Promise<void> {
    return this.albumService.remove(id);
  }
}
