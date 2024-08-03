import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';
import { AuthorResolver } from './author.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  providers: [AuthorService,AuthorResolver],
  exports:[AuthorService]
})
export class AuthorModule {}
