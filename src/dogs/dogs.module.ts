import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { DogsRepository } from './dogs.repository';
// import { DogsService } from './dogs.service';

@Module({
  providers: [DogsRepository],
  controllers: [DogsController],
})
export class DogsModule {}
