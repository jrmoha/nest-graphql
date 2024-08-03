import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './author.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async create(author: Author) {
    return this.authorModel.create(author);
  }
}
