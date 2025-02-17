import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../../types/book';
import { BooksService } from '../../services/books.service';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-books-list',
  imports: [
    BookCardComponent,
    NgForOf,
    RouterLink,
    MatButton
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss'
})
export class BooksListComponent implements OnInit {
  protected books!: Book[];

  private readonly booksService: BooksService = inject(BooksService);

  ngOnInit(): void {
    this.getBooks();
  }

  deleteBook(book: Partial<Book>): void {
    this.booksService.deleteBook(book).subscribe(() => this.getBooks());
  }

  private getBooks(): void {
    this.booksService.getBooks().subscribe(books => this.books = books);
  }
}
