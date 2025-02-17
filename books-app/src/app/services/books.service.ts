import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../types/book';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = '/api/books';

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${ this.apiUrl }`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${ this.apiUrl }/${ id }`);
  }

  addBook(book: Partial<Book>): Observable<void> {
    return this.http.post<void>(`${ this.apiUrl }`, book);
  }

  updateBook(book: Partial<Book>): Observable<void> {
    return this.http.put<void>(`${ this.apiUrl }/${ book.id }`, book);
  }

  deleteBook(book: Partial<Book>): Observable<void> {
    return this.http.delete<void>(`${ this.apiUrl }/${ book.id }`);
  }
}
