import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class DogsService {
  findDogs(): string {
    console.log('created within the DogsRepository DI subtree', Math.random());
    return "here's some dogs";
  }
}
