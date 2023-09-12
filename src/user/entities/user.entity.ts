import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  // TODO: make roles as enum
  @Prop()
  roles: string;
  @Prop()
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
