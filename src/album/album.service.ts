import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from './entities/album.entity';
import { Model } from 'mongoose';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private readonly albumModel: Model<Album>,
  ) {}
  create(createAlbumDto: CreateAlbumDto): Promise<AlbumDocument> {
    return this.albumModel.create(createAlbumDto);
  }

  findAll(): Promise<AlbumDocument[]> {
    return this.albumModel.find();
  }

  findOne(id: string): Promise<AlbumDocument | undefined> {
    return this.albumModel.findById(id);
  }

  update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumDocument | undefined> {
    return this.albumModel.findByIdAndUpdate(id, updateAlbumDto, { new: true });
  }

  async remove(id: string): Promise<void> {
    await this.albumModel.findByIdAndRemove(id);
  }
}
