import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;
@Schema({ timestamps: true })
export class Genre {
  @Prop({ unique: true })
  name: string;
  @Prop()
  description: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
