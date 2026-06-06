import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { TodoStatus } from './todo-status.enum';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  task?: string;

  @IsEnum(TodoStatus, {
    message: "Status must be either 'todo', 'in-progress', or 'done'",
  })
  @IsOptional()
  status?: TodoStatus;
}
