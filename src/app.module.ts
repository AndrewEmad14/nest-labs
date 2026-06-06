import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/entities/todo.entity';

@Module({
  imports: [
    // Load environment variables globally across your application
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? '',
      port: parseInt(process.env.DB_PORT || '', 10),
      username: process.env.DB_USERNAME ?? '',
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_NAME ?? '',
      entities: [Todo],
      synchronize: true,
    }),
    TodosModule,
  ],
})
export class AppModule {}
