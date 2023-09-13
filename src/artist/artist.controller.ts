import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistDocument } from './entities/artist.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { USER_ROLES } from '../auth/utils/types/user-role';
import { Public } from '../auth/decorators/public.decorator';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @Public()
  @Roles(USER_ROLES.ADMIN)
  create(@Body() createArtistDto: CreateArtistDto): Promise<ArtistDocument> {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll(): Promise<ArtistDocument[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<ArtistDocument | undefined> {
    return this.artistService.findOne(id);
  }

  @Patch(':id')
  @Roles(USER_ROLES.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistDocument | undefined> {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @Roles(USER_ROLES.ADMIN)
  async remove(@Param('id') id: string): Promise<void> {
    await this.artistService.remove(id);
  }
}
