import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { DogsService } from './dogs/dogs.service';

@Module({
  imports: [CatsModule, DogsModule],
  controllers: [AppController],
  providers: [AppService, DogsService],
})
export class AppModule {}
