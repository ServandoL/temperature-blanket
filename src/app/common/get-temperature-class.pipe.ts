import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTemperatureClass',
})
export class GetTemperatureClassPipe implements PipeTransform {
  transform(temp: number): string {
    if (temp > 105) return 'color-105-plus';
    if (temp < 30) return 'color-29-minus';
    const lowerBound = Math.floor(temp / 5) * 5;
    const upperBound = lowerBound + 4;
    return `color-${lowerBound}-${upperBound}`;
  }
}
