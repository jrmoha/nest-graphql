import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthorService } from './author.service';
import {
  AddBookToAuthorInput,
  Author,
  CreateAuthorInput,
  DeleteAuthorInput,
  FindAuthorInput,
  UpdateAuthorInput,
} from './author.schema';
import { BookService } from '../book/book.service';
import { Book } from '../book/book.schema';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private readonly booksService: BookService,
  ) {}

  @Query(() => [Author])
  authors(): Promise<Author[]> {
    return this.authorService.findMany();
  }

  @Query(() => Author, { nullable: true })
  async author(@Args('input') input: FindAuthorInput) {
    return this.authorService.findAuthor(input);
  }

  @ResolveField(() => [Book])
  async books(@Parent() parent: Author) {
    return this.booksService.findByAuthor(parent);
  }
  @Mutation(() => Author)
  async createAuthor(@Args('input') input: CreateAuthorInput) {
    return this.authorService.create(input);
  }

  @Mutation(() => Author)
  async updateAuthor(@Args('input') input: UpdateAuthorInput) {
    return this.authorService.update(input);
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteAuthor(@Args('input') input: DeleteAuthorInput) {
    await this.authorService.delete(input);
  }

  @Mutation(() => Author)
  async addBookToAuthor(@Args('input') input: AddBookToAuthorInput) {
    return this.authorService.addBook(input);
  }
}
