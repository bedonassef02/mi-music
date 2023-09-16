import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Genre, GenreDocument } from './entities/genre.entity';
import { Model } from 'mongoose';
import { GenreQueryFeature } from './dto/genre-query.feature';
import { ArtistQueryFeature } from '../artist/dto/artist-query.feature';
import { PaginationResponseFeature } from '../utils/features/pagination-response.feature';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name) private readonly genreModel: Model<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<GenreDocument> {
    const isNameExist: GenreDocument | undefined =
      await this.genreModel.findOne({ name: createGenreDto.name });
    if (!isNameExist) {
      return this.genreModel.create(createGenreDto);
    }
    throw new ConflictException('name already in use');
  }

  async findAll(query: GenreQueryFeature): Promise<PaginationResponseFeature> {
    const data: Genre[] = await this.genreModel
      .find({ $or: query.searchQuery })
      .select(query.fields)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort);
    return await this.paginationDetails(query, data);
  }

  findOne(id: string): Promise<GenreDocument | undefined> {
    return this.genreModel.findById(id);
  }

  update(
    id: string,
    updateGenreDto: UpdateGenreDto,
  ): Promise<GenreDocument | undefined> {
    return this.genreModel.findByIdAndUpdate(id, updateGenreDto, { new: true });
  }

  async remove(id: string): Promise<void> {
    await this.genreModel.findByIdAndRemove(id);
  }

  private async paginationDetails(
    query: ArtistQueryFeature,
    data: Genre[],
  ): Promise<PaginationResponseFeature> {
    const totalItems: number = await this.totalItems(query);
    const totalPages = Math.ceil(totalItems / query.limit);

    return {
      page: query.page,
      totalItems,
      pageSize: query.limit,
      totalPages,
      data,
    };
  }

  private async totalItems(query: GenreQueryFeature): Promise<number> {
    return this.genreModel.countDocuments({ $or: query.searchQuery });
  }
}
