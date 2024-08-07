import { Command, CommandRunner } from 'nest-commander';
import { AuthorService } from '../author/author.service';
import * as authors from '../data/authors';

@Command({ name: 'load-authors', description: 'Load Authors Data' })
export class AuthorDataLoaderCommand extends CommandRunner {
  constructor(private readonly authorService: AuthorService) {
    super();
  }
  async run(): Promise<void> {
    for (const author of authors.default) {
      await this.authorService.create({
        _id: author.id.toString(),
        name: author.name,
      });
    }
    console.log('Authors data loaded successfully!');
  }
}
