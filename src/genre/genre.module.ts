import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './entities/genre.entity';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { IsUserUpdatedMiddleware } from '../auth/middlewares/is-user-updated.middleware';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { GenreSongsController } from './controllers/genre-songs.controller';
import { GenreSongsService } from './services/genre-songs.service';
import { SongModule } from '../song/song.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
    AuthModule,
    UserModule,
    SongModule,
  ],
  controllers: [GenreController, GenreSongsController],
  providers: [GenreService, GenreSongsService],
})
export class GenreModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, IsUserUpdatedMiddleware)
      .forRoutes(GenreController);
  }
}
