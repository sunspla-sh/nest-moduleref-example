import { Controller, Get } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { RandomService } from './random.service';
import { AppService } from 'src/app.service';
import { TransientService } from './transient.service';
import { RequestScopedService } from './request-scoped.service';
import { UnregisteredService } from './unregistered.service';

@Controller('cats')
export class CatsController {
  private randomService: RandomService;

  constructor(private catsService: CatsService, private moduleRef: ModuleRef) {}

  @Get()
  findAllCats(): Array<Cat> {
    return this.catsService.findAllCats();
  }

  @Get('add')
  addCat(): string {
    this.catsService.addCat();
    return 'A new cat was added';
  }

  @Get('unregistered')
  async doUnregistered(): Promise<string> {
    /**
     * this.moduleRef.create() instantiates a provider that was not previously registered in this module
     */
    const notPreviouslyRegisteredAsAProvider = await this.moduleRef.create(
      UnregisteredService,
    );
    return notPreviouslyRegisteredAsAProvider.doUnregisteredStuff();
  }

  @Get('random')
  doRandom(): string {
    /**
     * this.moduleRef.get() obtains a reference to instantiated static providers, controllers, or injectables in the current module
     * using the injection token as a lookup key. By adding the { strict: false } option, we can retrieve a provider from the
     * global context (for example, if the provider was injected in a different module). The moduleRef.get() method does not work
     * for transient or request-scoped providers. Instead, use moduleRef.resolve for transient or request-scoped providers.
     */
    console.log('first random service', this.randomService);
    this.randomService = this.moduleRef.get(RandomService);
    console.log("here's the random service: ", this.randomService);
    console.log(
      "here's the app service: ",
      this.moduleRef.get(AppService, { strict: false }),
    );
    return this.randomService.doRandomStuff();
  }

  @Get('transient')
  async doTransient(): Promise<string> {
    /**
     * this.moduleRef.resolve() instantiates a transient or request-scoped provider and returns the new instance. Each time the
     * instance will be unique unless a contextId is created and passed as the second argument of the moduleRef.resolve() method
     * The provider must be in the list of module providers unless a third argument, { strict: false }, is passed to moduleRef.resolve()
     * In that case, the provider can be listed in any of the modules of the application, however it still must be listed somewhere
     * in order to be resolved.
     */
    const tS = await this.moduleRef.resolve(TransientService);
    const id = ContextIdFactory.create();
    const tSArray = await Promise.all([
      this.moduleRef.resolve(TransientService, id),
      this.moduleRef.resolve(TransientService, id),
    ]);
    console.log(tSArray[0], tSArray[1], tSArray[0] === tSArray[1]); //true because same contextid
    console.log(tS, tSArray[0] === tS, tSArray[1] === tS); //false because resolved with different contextids
    return tS.doTransientStuff();
  }

  @Get('manual-request')
  async doManualRequest(): Promise<string> {
    /**
     * this.moduleRef.registerRequestByContextId adds a new object representing the request object to a given DI sub-tree.
     * Manually generated context identifiers have an undefined REQUEST provider by default as they were not instantiated
     * and managed by the Nest dependency injection system.
     */
    const contextId = ContextIdFactory.create();
    const customRequestObject: Record<string, unknown> = {
      stuff: 'hi',
      lol: 'ha',
      yo: 'sup',
    };
    this.moduleRef.registerRequestByContextId(customRequestObject, contextId);
    const rQS = await this.moduleRef.resolve(RequestScopedService, contextId);
    return rQS.doRequestScopedStuff();
  }
}
