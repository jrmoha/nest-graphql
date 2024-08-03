import { BookService } from 'src/book/book.service';
import * as books from '../data/books';
import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'load-books', description: 'Load books Data' })
export class BookDataLoaderCommand extends CommandRunner {
  constructor(private readonly bookService: BookService) {
    super();
  }
  async run(): Promise<void> {
    for (const book of books.default) {
      await this.bookService.create({
        title: book.title,
        isbn: book.isbn,
        language_code: book.language_code,
        average_rating: book.average_rating,
        author: book.author.toString(),
      });
    }
    console.log('Books data loaded successfully!');
  }
}
