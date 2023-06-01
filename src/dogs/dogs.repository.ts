import { Injectable, Inject, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { DogsService } from './dogs.service';
import { ContextIdFactory, REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class DogsRepository {
  constructor(
    private moduleRef: ModuleRef,
    @Inject(REQUEST) private request: Record<string, unknown>,
  ) {}

  async doDogsRepositoryStuff(): Promise<string> {
    const contextId = ContextIdFactory.getByRequest(this.request);
    const dS = await this.moduleRef.resolve(DogsService, contextId, {
      strict: false,
    });
    return dS.findDogs();
  }
}
