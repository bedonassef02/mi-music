import { UserDto } from '../../dto/user.dto';
import { UserDocument } from '../../../user/entities/user.entity';

export function plainIntoUserDto(user: UserDocument): UserDto {
  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token: '',
  };
}
