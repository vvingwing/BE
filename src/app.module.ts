import { Module } from '@nestjs/common';
import databaseConfig from './global/config/database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
