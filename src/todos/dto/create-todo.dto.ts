import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { TodoStatus } from './todo-status.enum';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  task: string;

  @IsEnum(TodoStatus, {
    message: "Status must be either 'todo', 'in-progress', or 'done'",
  })
  @IsOptional()
  status?: TodoStatus;
}
