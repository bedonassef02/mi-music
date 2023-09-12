import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Artist } from '../../artist/entities/artist.entity';
import * as mongoose from 'mongoose';
import { Genre } from '../../genre/entities/genre.entity';

export type SongDocument = HydratedDocument<Song>;
@Schema({ timestamps: true })
export class Song {
  @Prop()
  name: string;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }])
  artists: Artist[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
  genre: Genre;
  @Prop()
  releaseDate: Date;
  @Prop()
  duration: number;
  @Prop()
  fileName: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
