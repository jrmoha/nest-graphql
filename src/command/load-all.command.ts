import { Command, CommandRunner } from 'nest-commander';
import { AuthorDataLoaderCommand } from './author-data-loader.command';
import { BookDataLoaderCommand } from './book-data-loader.command';

@Command({ name: 'load-all', description: 'Load Authors and Books Data' })
export class DataLoaderCommand extends CommandRunner {
  constructor(
    private readonly authorDataLoaderCommand: AuthorDataLoaderCommand,
    private readonly bookDataLoaderCommand: BookDataLoaderCommand,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.authorDataLoaderCommand.run();
    await this.bookDataLoaderCommand.run();
    console.log('Authors and Books data loaded successfully!');
  }
}
