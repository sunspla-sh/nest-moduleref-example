import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class RequestScopedService {
  constructor(@Inject(REQUEST) private request: Record<string, unknown>) {}

  doRequestScopedStuff(): string {
    return JSON.stringify(this.request);
  }
}
