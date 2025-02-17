import { Component, inject, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookForm } from '../../types/book';
import { SelectFileDirective } from '../../directives/select-file.directive';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormatImagePathPipe } from '../../pipes/format-image-path.pipe';

@Component({
  selector: 'app-book-details',
  imports: [
    ReactiveFormsModule,
    SelectFileDirective,
    RouterLink,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    FormatImagePathPipe
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {
  private readonly booksService: BooksService = inject(BooksService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  protected readonly form: FormGroup<BookForm> = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    author: new FormControl(),
    image: new FormControl(),
  });

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    if (id) {
      this.booksService.getBookById(id).subscribe(book => this.form.patchValue(book))
    }
  }

  handleFileChange(file: File): void {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.controls.image.patchValue(reader.result as string)
      };
      reader.readAsDataURL(file); // convert to base64 string
    }
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const { value } = this.form;

    if (value.id) {
      this.booksService.updateBook(value).subscribe(_ => this.router.navigateByUrl('/books'));
    } else {
      this.booksService.addBook(value).subscribe(_ => this.router.navigateByUrl('/books'));
    }
  }
}
