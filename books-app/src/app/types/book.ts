import { FormControl } from '@angular/forms';

export interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
}

export interface BookForm {
  id: FormControl<number>;
  title: FormControl<string>;
  description: FormControl<string>;
  image: FormControl<string>;
  author: FormControl<string>;
}
