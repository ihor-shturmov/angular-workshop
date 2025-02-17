import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatImagePath'
})
export class FormatImagePathPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    } else if (value.includes('base64')) {
      return value;
    } else {
      return `http://localhost:3000/${ value }`;
    }
  }

}
