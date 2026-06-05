import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { Todo } from './todo.type';
import { TodosService } from './todos.service';
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}
  @Get()
  getAllTodos(): Todo[] {
    return this.todosService.getAllTodos();
  }
  @Get(':id')
  getTodoById(@Param('id') id: number): Todo | string {
    const todo = this.todosService.getTodoById(+id);
    if (todo) {
      return todo;
    }
    throw new NotFoundException('no todo found');
  }
  @Post()
  createTodo(
    @Body() body: { task: string; status: 'todo' | 'in-progress' | 'done' },
  ): Todo | string {
    const createdTodo = this.todosService.createTodo(body);
    if (createdTodo) {
      return createdTodo;
    }
    throw new BadRequestException('failed to create todo');
  }
  @Patch(':id')
  updateTodo(
    @Body() body: { task?: string; status?: 'todo' | 'in-progress' | 'done' },
    @Param('id') id: number,
  ): Todo | string {
    const updatedTodo = this.todosService.updateTodo(body, +id);
    if (updatedTodo) {
      return updatedTodo;
    }
    throw new BadRequestException('bad request');
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: number): Todo | string {
    const deletedTodo = this.todosService.deleteTodoById(+id);
    if (deletedTodo) {
      return deletedTodo;
    }
    throw new NotFoundException('no todo found');
  }
}
