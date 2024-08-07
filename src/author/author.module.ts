import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorService } from './author.service';
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
  providers: [AuthorResolver, AuthorService, BookService],
  exports: [AuthorService],
})
export class AuthorModule {}
