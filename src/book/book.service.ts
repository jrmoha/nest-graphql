import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.schema';
import { Model } from 'mongoose';
import { Author } from 'src/author/author.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(book: Book) {
    return this.bookModel.create(book);
  }

  async findByAuthor(author: Author) {
    return this.bookModel.find({ author: author._id }).lean();
  }
}
