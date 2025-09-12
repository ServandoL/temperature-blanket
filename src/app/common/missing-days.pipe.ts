import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'missingDays',
})
export class MissingDaysPipe implements PipeTransform {
  transform(value: string[]): string {
    return value.join(', ');
  }
}
