//TODO: IMPORTANT! This needs unit testing, bugs will occur on values bigger than TBs

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'memory'})
export class MemoryPipe implements PipeTransform {

  private units = ['MB', 'GB', 'TB'];

  transform(value: number): string {
    let unit = 0;
    let newValue = value;
    while (newValue / 1000 > 1 && unit < 3) {
      newValue /= 1000;
      unit++;
    }
    return `${newValue} ${this.units[unit]}`;
  }
}
