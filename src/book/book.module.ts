import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { BookResolver } from './book.resolver';
import { AuthorService } from 'src/author/author.service';
import { Author, AuthorSchema } from 'src/author/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  providers: [BookService, BookResolver, AuthorService],
  exports: [BookService],
})
export class BookModule {}
