import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../types/book';
import { FormatImagePathPipe } from '../../pipes/format-image-path.pipe';
import { RouterLink } from '@angular/router';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-book-card',
  imports: [
    FormatImagePathPipe,
    RouterLink,
    MatCard,
    MatButton,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardImage,
    MatCardActions
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  @Input() book!: Book;

  @Output() delete = new EventEmitter<Book>();
}
