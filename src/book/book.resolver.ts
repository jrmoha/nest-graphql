import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './book.schema';
import { AuthorService } from 'src/author/author.service';
import { Author } from 'src/author/author.schema';

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

  @ResolveField(() => Author)
  async author(@Parent() parent: Book) {
    const author_id = parent.author as string;

    return this.authorService.findAuthor({
      _id: author_id,
    });
  }
}
