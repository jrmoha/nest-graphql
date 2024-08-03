import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.schema';
import { BookResolver } from './book.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [BookService, BookResolver],
  exports: [BookService],
})
export class BookModule {}
