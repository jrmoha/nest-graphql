import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author, FindAuthorInput } from './author.schema';

@Resolver()
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(() => [Author])
  authors(): Promise<Author[]> {
    return this.authorService.findMany();
  }

  @Query(() => Author, { nullable: true })
  async author(@Args('input') input: FindAuthorInput) {
    return this.authorService.findAuthor(input);
  }
}
