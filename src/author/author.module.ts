import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  providers: [AuthorService],
  exports:[AuthorService]
})
export class AuthorModule {}
