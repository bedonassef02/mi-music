import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../../user/entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { plainIntoUserDto } from '../utils/helpers/plain-into-user-dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateResponse(user: UserDocument): UserDto {
    const result = plainIntoUserDto(user);
    result.token = this.generateToken(result.user);
    return result;
  }

  generateToken(payload: any): any {
    return this.jwtService.sign(payload);
  }
}
