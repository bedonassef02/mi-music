import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Song } from '../../song/entities/song.entity';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../../user/entities/user.entity';

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema({ timestamps: true })
export class Playlist {
  @Prop()
  name: string;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }])
  songs: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  // TODO: add image
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
