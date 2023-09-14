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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { USER_ROLES } from '../auth/utils/types/user-role';
import { Public } from '../auth/decorators/public.decorator';
import { ArtistQueryFeature } from './dto/artist-query.feature';
import { ParseMongoIdPipe } from '../utils/pipes/is-mongo-id.pipe';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @Public()
  @Roles(USER_ROLES.ADMIN)
  create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll(@Query() query: ArtistQueryFeature): Promise<Artist[]> {
    return this.artistService.findAll(query);
  }

  @Get(':id')
  @Public()
  @UsePipes(ParseMongoIdPipe)
  findOne(@Param('id') id: string): Promise<Artist | undefined> {
    return this.artistService.findOne(id);
  }

  @Patch(':id')
  @Roles(USER_ROLES.ADMIN)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | undefined> {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @Roles(USER_ROLES.ADMIN)
  @UsePipes(ParseMongoIdPipe)
  async remove(@Param('id') id: string): Promise<void> {
    await this.artistService.remove(id);
  }
}
