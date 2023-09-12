import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema({ timestamps: true })
export class Artist {
  @Prop()
  name: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
