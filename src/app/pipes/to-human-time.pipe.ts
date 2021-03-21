import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toHumanTime' })
export class ToHumanTimePipe implements PipeTransform {
  constructor() {}

  transform(dateTime: Date): string {
    return dateTime.toLocaleString();
  }
}
