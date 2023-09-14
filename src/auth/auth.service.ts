import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './services/password.service';
import { UserDocument } from '../user/entities/user.entity';
import { plainIntoUserDto } from './utils/helpers/plain-into-user-dto';
import { UserDto } from './dto/user.dto';
import { CreatePlaylistDto } from '../playlist/dto/create-playlist.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private eventEmitter: EventEmitter2,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserDto> {
    await this.isUserExist(registerDto.email);
    registerDto.password = await this.passwordService.hashPassword(
      registerDto.password,
    );
    const user: UserDocument = await this.userService.create(registerDto);
    this.createDefaultPlaylist(user.id);
    return this.generateResponse(user);
  }

  async login(loginDto: LoginDto) {
    const user: UserDocument | undefined = await this.userService.findByEmail(
      loginDto.email,
    );
    if (
      user &&
      (await this.passwordService.comparePassword(
        loginDto.password,
        user.password,
      ))
    ) {
      return this.generateResponse(user);
    }
    throw new BadRequestException('email or password not match our records');
  }

  verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new BadRequestException('token is not valid');
    }
  }

  private async isUserExist(email: string): Promise<true> {
    const user: UserDocument | undefined = await this.userService.findByEmail(
      email,
    );
    if (user) {
      throw new ConflictException('this email is already in use');
    }
    return true;
  }

  private createDefaultPlaylist(id: string) {
    const createPlaylistDto: CreatePlaylistDto = {
      user: id,
      name: 'history',
    };
    this.eventEmitter.emitAsync('playlist.create', createPlaylistDto).then();
    createPlaylistDto.name = 'favorite';
    this.eventEmitter.emitAsync('playlist.create', createPlaylistDto).then();
  }

  private generateResponse(user: UserDocument): UserDto {
    const result = plainIntoUserDto(user);
    result.token = this.jwtService.sign(result.user);
    return result;
  }
}
