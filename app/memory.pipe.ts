import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'memory'})
export class MemoryPipe implements PipeTransform {

  private units = ['MB', 'GB', 'TB'];

  transform(value: number): string {
    let unit = 0;
    while (value / 1000 >= 1 && unit < 2) {
      value /= 1000;
      unit++;
    }
    return `${value} ${this.units[unit]}`;
  }
}
