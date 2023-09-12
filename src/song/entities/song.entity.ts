import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Artist } from '../../artist/entities/artist.entity';
import * as mongoose from 'mongoose';
import { Genre } from '../../genre/entities/genre.entity';
import { Album } from '../../album/entities/album.entity';

export type SongDocument = HydratedDocument<Song>;
@Schema({ timestamps: true })
export class Song {
  @Prop()
  name: string;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }])
  artists: Artist[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' })
  genre: Genre;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Album' })
  album: Album;
  @Prop()
  releaseYear: number;
  @Prop()
  duration: number;
  @Prop()
  fileName: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
