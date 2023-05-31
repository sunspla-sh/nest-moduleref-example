import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private cats: Array<Cat> = [];

  findAllCats(): Array<Cat> {
    return this.cats;
  }

  addCat(): void {
    this.cats = [...this.cats, { name: 'new cat', age: 5 }];
  }
}
