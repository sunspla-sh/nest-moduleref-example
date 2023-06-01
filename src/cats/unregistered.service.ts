import { Injectable } from '@nestjs/common';

@Injectable()
export class UnregisteredService {
  doUnregisteredStuff(): string {
    return 'unregistered stuff';
  }
}
