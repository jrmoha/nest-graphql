import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author, FindAuthorInput } from './author.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async create(author: Author) {
    return this.authorModel.create(author);
  }
  async findMany() {
    return this.authorModel.find();
  }

  async findAuthor({ id }: FindAuthorInput) {
    return this.authorModel.findById(id);
  }
}
