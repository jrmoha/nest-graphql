import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Book,
  CreateBookInput,
  DeleteBookInput,
  UpdateBookInput,
} from './book.schema';
import { Author } from '../author/author.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async create(input: CreateBookInput) {
    const book = await this.bookModel.create(input);
    await this.authorModel.updateOne(
      { _id: input.author },
      { $addToSet: { books: book._id } },
    );
    return book;
  }

  async findByAuthor(author: Author) {
    return this.bookModel.find({ author: author._id }).lean();
  }
  async findMany() {
    return this.bookModel.find();
  }

  async update(input: UpdateBookInput) {
    const book = await this.bookModel.findOneAndUpdate(
      { _id: input._id },
      { ...input },
      { new: false },
    );

    if (!book)
      throw new NotFoundException(`Book with #id ${input._id} doesn't exist`);

    if (book.author != input.author) {
      await this.authorModel.updateOne(
        { _id: book.author },
        { $pull: { books: book._id } },
      );
      await this.authorModel.updateOne(
        {
          _id: input.author,
        },
        {
          $addToSet: { books: book._id },
        },
      );
    }

    return book;
  }

  async deleteBook({ _id }: DeleteBookInput) {
    return this.bookModel.deleteOne({ _id });
  }
}
