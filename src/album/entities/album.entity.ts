import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Artist } from '../../artist/entities/artist.entity';
import mongoose, { HydratedDocument } from 'mongoose';

export type AlbumDocument = HydratedDocument<Album>;
@Schema({ timestamps: true })
export class Album {
  @Prop()
  name: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
  artist: Artist;
  @Prop()
  releaseYear: number;
  @Prop()
  image: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
