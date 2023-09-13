import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(registerUserDto): Promise<UserDocument> {
    return this.userModel.create(registerUserDto);
  }

  findByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email });
  }
  findOne(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }
  changeRole(id: string, role: string): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, { role }, { new: true });
  }

  changePassword(id: string, password: string): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, { password }, { new: true });
  }
  changeUsername(id: string, username: string): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, { username }, { new: true });
  }
}
