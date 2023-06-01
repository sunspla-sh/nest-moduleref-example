import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class TransientService {
  doTransientStuff(): string {
    return 'some transient stuff';
  }
}
