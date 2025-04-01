import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [TodoModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
