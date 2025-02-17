import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar class="bg-blue-500 text-white p-4">
      <span class="text-xl font-semibold">📚 My Book Library</span>
      <span class="flex-grow"></span>
      <button mat-button routerLink="/books" class="text-white">Books</button>
      <button mat-button routerLink="/favorites" class="text-white">Favorites</button>
    </mat-toolbar>
  `,
  imports: [
    MatToolbar,
    MatButton,
    RouterLink
  ],
  styles: [``]
})
export class HeaderComponent {}
