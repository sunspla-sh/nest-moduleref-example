import { Controller, Get, UseInterceptors } from '@nestjs/common';
// import { DogsService } from './dogs.service';
import { DogsRepository } from './dogs.repository';
import { DogsInterceptor } from './dogs.interceptor';

@Controller('dogs')
@UseInterceptors(DogsInterceptor)
export class DogsController {
  constructor(private dogsRepository: DogsRepository) {}

  // @Get()
  // findDogs(): string {
  //   return this.dogsService.findDogs();
  // }

  @Get('get-current-subtree')
  async gettingCurrentSubtree(): Promise<string> {
    return this.dogsRepository.doDogsRepositoryStuff();
  }
}
