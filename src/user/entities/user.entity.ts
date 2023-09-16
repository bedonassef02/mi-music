import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { USER_ROLES } from '../../auth/utils/types/user-role';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop({ default: USER_ROLES.USER, enum: USER_ROLES })
  role: string;
  @Prop({ default: 'default.jpg' })
  image: string;
  @Prop({ default: 'google' })
  client: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
