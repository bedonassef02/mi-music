import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreDocument } from './entities/genre.entity';
import { Public } from '../auth/decorators/public.decorator';
import { USER_ROLES } from '../auth/utils/types/user-role';
import { Roles } from '../auth/decorators/roles.decorator';

// TODO: make another controller and service to get genre with songs
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @Roles(USER_ROLES.ADMIN)
  create(@Body() createGenreDto: CreateGenreDto): Promise<GenreDocument> {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @Public()
  findAll(): Promise<GenreDocument[]> {
    return this.genreService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<GenreDocument | undefined> {
    return this.genreService.findOne(id);
  }

  @Patch(':id')
  @Roles(USER_ROLES.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ): Promise<GenreDocument | undefined> {
    return this.genreService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @Roles(USER_ROLES.ADMIN)
  remove(@Param('id') id: string): Promise<void> {
    return this.genreService.remove(id);
  }
}
