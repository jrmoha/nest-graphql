import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';
import { AuthorResolver } from './author.resolver';
import { BookService } from 'src/book/book.service';
import { Book, BookSchema } from 'src/book/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Author.name, schema: AuthorSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  providers: [AuthorService, AuthorResolver, BookService],
  exports: [AuthorService],
})
export class AuthorModule {}
