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
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreDocument } from './entities/genre.entity';
import { Public } from '../auth/decorators/public.decorator';
import { USER_ROLES } from '../auth/utils/types/user-role';
import { Roles } from '../auth/decorators/roles.decorator';
import { GenreQueryFeature } from './dto/genre-query.feature';
import { ParseMongoIdPipe } from '../utils/pipes/is-mongo-id.pipe';

// TODO: make another controller and service to get genre with songs
@Controller({ path: 'genre', version: '1' })
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  // TODO: implement filter for duplicates
  @Post()
  @Roles(USER_ROLES.ADMIN)
  create(@Body() createGenreDto: CreateGenreDto): Promise<GenreDocument> {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: GenreQueryFeature): Promise<GenreDocument[]> {
    return this.genreService.findAll(query);
  }

  @Get(':id')
  @Public()
  @UsePipes(ParseMongoIdPipe)
  findOne(@Param('id') id: string): Promise<GenreDocument | undefined> {
    return this.genreService.findOne(id);
  }

  @Patch(':id')
  @Roles(USER_ROLES.ADMIN)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ): Promise<GenreDocument | undefined> {
    return this.genreService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @Roles(USER_ROLES.ADMIN)
  @UsePipes(ParseMongoIdPipe)
  remove(@Param('id') id: string): Promise<void> {
    return this.genreService.remove(id);
  }
}
