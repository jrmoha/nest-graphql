import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AddBookToAuthorInput,
  Author,
  CreateAuthorInput,
  DeleteAuthorInput,
  FindAuthorInput,
  UpdateAuthorInput,
} from './author.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async create(author: CreateAuthorInput) {
    return this.authorModel.create({...author,_id:author._id??new Types.ObjectId()});
  }
  async findMany() {
    return this.authorModel.find();
  }

  async findAuthor({ id }: FindAuthorInput) {
    return this.authorModel.findById(id);
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

    return this.authorModel.deleteOne({ _id });
  }
  async addBook({ _id, bookId }: AddBookToAuthorInput) {
    return this.authorModel.updateOne(
      { _id },
      { $addToSet: { books: [bookId] } },
    );
  }
}
