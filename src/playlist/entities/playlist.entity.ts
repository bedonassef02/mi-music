import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Song } from '../../song/entities/song.entity';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema({ timestamps: true })
export class Playlist {
  @Prop()
  name: string;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }])
  songs: Song[];
  // TODO: add user when implement user module
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
