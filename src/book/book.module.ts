import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { Book, BookSchema } from './book.schema';
import { BookResolver } from './book.resolver';
import { AuthorService } from '../author/author.service';
import { Author, AuthorSchema } from '../author/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  providers: [BookResolver, BookService, AuthorService],
  exports: [BookService],
})
export class BookModule {}
