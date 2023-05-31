import { Controller, Get } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { RandomService } from './random.service';
import { AppService } from 'src/app.service';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    private randomService: RandomService,
    private moduleRef: ModuleRef,
  ) {}

  @Get()
  findAllCats(): Array<Cat> {
    return this.catsService.findAllCats();
  }

  @Get('add')
  addCat(): string {
    this.catsService.addCat();
    return 'A new cat was added';
  }

  @Get('random')
  doRandom(): string {
    /**
     * this.moduleRef.get() obtains a reference to intstantiated static providers, controllers, or injectables in the current module
     * using the injection token as a lookup key. By adding the { strict: false } option, we can retrieve a provider from the
     * global context (for example, if the provider was injected in a different module). The moduleRef.get() method does not work
     * for transient or request-scoped providers. Instead, use moduleRef.resolve for transient or request-scoped providers.
     */
    console.log(
      "here's the random service: ",
      this.moduleRef.get(RandomService),
    );
    console.log(
      "here's the app service: ",
      this.moduleRef.get(AppService, { strict: false }),
    );
    return this.randomService.doRandomStuff();
  }
}
