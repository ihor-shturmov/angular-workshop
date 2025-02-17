import { Routes } from '@angular/router';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books',
  },
  {
    path: 'books',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BooksListComponent,
      },
      {
        path: 'add',
        pathMatch: 'full',
        component: BookDetailsComponent,
      },
      {
        path: ':id',
        component: BookDetailsComponent,
      }
    ]
  }
];
