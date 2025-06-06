import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    DatabaseModule],

  controllers: [],
  providers: [],
})
export class AppModule {}
