import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomService {
  doRandomStuff(): string {
    return 'wow much random: ' + Math.random();
  }
}
