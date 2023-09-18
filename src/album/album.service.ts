import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from './entities/album.entity';
import { Model } from 'mongoose';
import { AlbumQueryFeature } from './dto/album-query.feature';
import { paginationDetails } from '../utils/helpers/pagination-details';
import { PaginationResponseFeature } from '../utils/features/pagination-response.feature';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private readonly albumModel: Model<Album>,
  ) {}
  create(createAlbumDto: CreateAlbumDto): Promise<AlbumDocument> {
    return this.albumModel.create(createAlbumDto);
  }

  async findAll(query: AlbumQueryFeature): Promise<PaginationResponseFeature> {
    const albums: Album[] = await this.albumModel
      .find({ $or: query.searchQuery })
      .select(query.fields)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort);
    const totalItems: number = await this.totalItems(query.searchQuery);
    return paginationDetails(query, albums, totalItems);
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

  private async totalItems(searchQuery: any): Promise<number> {
    return this.albumModel.countDocuments({ $or: searchQuery });
  }
}
