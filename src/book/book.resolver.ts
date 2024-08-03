import { Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './book.schema';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}
}
