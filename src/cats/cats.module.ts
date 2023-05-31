import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { RandomService } from './random.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService, RandomService],
})
export class CatsModule {}
