import { Pipe, PipeTransform } from '@angular/core';
import { ITime } from './interfaces';

@Pipe({
  name: 'yearSelect',
})
export class YearSelectPipe implements PipeTransform {
  transform(date: Date | string): string {
    if (typeof date === 'string') {
      try {
        const d = JSON.parse(date) as ITime;
        return `${d.year}-${String(d.month).padStart(2, '0')}-${d.date.toString().padStart(2, '0')}`;
      } catch (error) {
        console.error('Error parsing date string:', error);
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      }
    } else {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
  }
}
