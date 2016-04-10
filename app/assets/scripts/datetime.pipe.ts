import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'datetime'})
export class DatetimePipe implements PipeTransform {
  transform(value:number, [exponent]) : string {
    let dt = new Date(value),
        d = this.twodigit(dt.getDate()),
        m = this.twodigit(dt.getMonth() + 1),
        y = dt.getFullYear(),
        h = this.twodigit(dt.getHours()),
        i = this.twodigit(dt.getMinutes()),
        s = this.twodigit(dt.getSeconds());
    return (`${d}/${m}/${y} ${h}:${i}:${s}`);
  }

  twodigit(value: number) {
      return `0${value}`.slice(-2);
  }

}