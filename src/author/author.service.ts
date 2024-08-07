import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AddBookToAuthorInput,
  Author,
  CreateAuthorInput,
  DeleteAuthorInput,
  FindAuthorInput,
  UpdateAuthorInput,
} from './author.schema';
import { Book } from 'src/book/book.schema';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(author: CreateAuthorInput) {
    return this.authorModel.create({
      ...author,
      _id: author._id ?? new Types.ObjectId(),
    });
  }
  async findMany() {
    return this.authorModel.find();
  }

  async findAuthor({ _id }: FindAuthorInput) {
    if (!_id) return null;

    return this.authorModel.findOne({ _id });
  }
  async update({ _id, name }: UpdateAuthorInput) {
    const author = await this.authorModel.findById(_id);

    if (!author)
      throw new NotFoundException(`Author with #id ${_id} not found`);

    if (author.name === name) return author;

    author.name = name;

    return author.save();
  }
  async delete({ _id }: DeleteAuthorInput) {
    const author = await this.authorModel.findById(_id);

    if (!author)
      throw new NotFoundException(`Author with #id ${_id} not found`);

    await this.bookModel.updateMany({ author: _id }, { author: null });

    await this.authorModel.deleteOne({ _id });
    return true;
  }
  async addBook({ _id, bookId }: AddBookToAuthorInput) {
    const book_exists = await this.bookModel.findById(bookId);

    if (!book_exists) throw new NotFoundException("Book doesn't exist");
    if (book_exists.author)
      throw new BadRequestException('Book Already Assigned to an author');

    book_exists.author = _id;
    await book_exists.save();

    return this.authorModel
      .findOneAndUpdate({ _id }, { $addToSet: { books: [bookId] } })
      .select('_id name');
  }
}
