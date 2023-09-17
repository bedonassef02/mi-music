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
  UseInterceptors,
  UploadedFile,
  ParseFilePipe, UseGuards
} from "@nestjs/common";
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumDocument } from './entities/album.entity';
import { USER_ROLES } from '../auth/utils/types/user-role';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { AlbumQueryFeature } from './dto/album-query.feature';
import { ParseMongoIdPipe } from '../utils/pipes/is-mongo-id.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageTypeValidation } from '../utils/validation/image-type.validation';
import { RoleGuard } from "../auth/guards/role.guard";

// TODO: make album songs controller & service
@Controller({ path: 'album', version: '1' })
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Post()
  @Roles(USER_ROLES.ADMIN)
  @UseGuards(RoleGuard)
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumDocument> {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: AlbumQueryFeature): Promise<AlbumDocument[]> {
    return this.albumService.findAll(query);
  }

  @Get(':id')
  @Public()
  @UsePipes(ParseMongoIdPipe)
  findOne(@Param('id') id: string): Promise<AlbumDocument | undefined> {
    return this.albumService.findOne(id);
  }

  @Patch(':id')
  @Roles(USER_ROLES.ADMIN)
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumDocument | undefined> {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @Roles(USER_ROLES.ADMIN)
  @UseGuards(RoleGuard)
  @UsePipes(ParseMongoIdPipe)
  remove(@Param('id') id: string): Promise<void> {
    return this.albumService.remove(id);
  }

  @Patch(':id/change-image')
  @Roles(USER_ROLES.ADMIN)
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  changeImage(
    @Param('id', ParseMongoIdPipe) id: string,
    @UploadedFile(new ParseFilePipe(imageTypeValidation()))
    image: Express.Multer.File,
  ): Promise<AlbumDocument | undefined> {
    return this.albumService.update(id, { image: image.filename });
  }
}
