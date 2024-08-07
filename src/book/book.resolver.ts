import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BookService } from './book.service';
import {
  Book,
  CreateBookInput,
  DeleteBookInput,
  UpdateBookInput,
} from './book.schema';
import { AuthorService } from 'src/author/author.service';
import { Author } from 'src/author/author.schema';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
  ) {}

  @Query(() => [Book])
  async books() {
    return this.bookService.findMany();
  }

  @ResolveField(() => Author, { nullable: true })
  async author(@Parent() parent: Book) {
    const author_id = parent.author;
    if (!author_id)
      throw new BadRequestException(
        `Author with #id ${author_id} not found for book ${parent._id}`,
      );
    return this.authorService.findAuthor({
      _id: author_id,
    });
  }

  @Mutation(() => Book)
  async updateBook(@Args('input') input: UpdateBookInput) {
    return this.bookService.update(input);
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: CreateBookInput) {
    return this.bookService.create(input);
  }

  @Mutation(() => Boolean)
  async deleteBook(@Args('input') input: DeleteBookInput) {
    await this.bookService.deleteBook(input);
    return true;
  }
}
