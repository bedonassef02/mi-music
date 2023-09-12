import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Artist } from '../../artist/entities/artist.entity';
import * as mongoose from 'mongoose';

export type SongDocument = HydratedDocument<Song>;
@Schema({ timestamps: true })
export class Song {
  @Prop()
  name: string;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }])
  artists: Artist[];
  @Prop()
  releaseDate: Date;
  @Prop()
  duration: number;
  @Prop()
  fileName: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
