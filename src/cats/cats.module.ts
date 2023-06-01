import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { RandomService } from './random.service';
import { TransientService } from './transient.service';
import { RequestScopedService } from './request-scoped.service';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    RandomService,
    TransientService,
    RequestScopedService,
  ],
})
export class CatsModule {}
