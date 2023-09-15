import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../user/entities/user.entity';

export type TokenDocument = HydratedDocument<Token>;

@Schema({ timestamps: true })
export class Token {
  @Prop()
  token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
