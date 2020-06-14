import { Component } from '@angular/core';
import { Cached } from 'src/lib/decorators/cached/cached.decorator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-playground';
  data = { first: 1, second: 3456^20 };
  constructor() {
    console.time('first');
    console.log(this.getCachedData('second', this.data));
    console.timeEnd('first');
    console.time('second');
    console.log(this.getCachedData('second', this.data));
    console.log(this.getCachedData('second', this.data));
    console.log(this.getCachedData('first', this.data));
    console.log(this.getCachedData('first', this.data));
    console.log(this.getCachedData('second', this.data));
    console.timeEnd('second');
    console.time('third');
    console.log(this.getNotCachedData('second', this.data));
    console.log(this.getNotCachedData('second', this.data));
    console.log(this.getNotCachedData('first', this.data));
    console.log(this.getNotCachedData('first', this.data));
    console.log(this.getNotCachedData('second', this.data));
    console.timeEnd('third');
  }

  @Cached()
  getCachedData(id, data) {
    return eval('(function () {return 3;})()');
  }

  getNotCachedData(id, data) {
    return eval('(function () {return 3;})()');
  }
}
