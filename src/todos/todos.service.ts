import { Injectable } from '@nestjs/common';
import { Todo } from './todo.type';
@Injectable()
export class TodosService {
  private readonly todos: Todo[] = [];
  getAllTodos(): Todo[] {
    return this.todos;
  }
  getTodoById(id: number): Todo | undefined {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      return todo;
    } else {
      return undefined;
    }
  }
  createTodo(todo: {
    task: string;
    status: 'todo' | 'in-progress' | 'done';
  }): Todo {
    const newTodo = new Todo(todo.task, todo.status);
    this.todos.push(newTodo);
    return newTodo;
  }
  updateTodo(
    todoTarget: { task?: string; status?: 'todo' | 'in-progress' | 'done' },
    targetId: number,
  ): Todo | undefined {
    const index = this.todos.findIndex((todo) => todo.id === targetId);
    if (index !== -1) {
      this.todos[index] = {
        id: targetId,
        task: todoTarget.task || this.todos[index].task,
        status: todoTarget.status || this.todos[index].status,
      };
      return this.todos[index];
    }
    return undefined;
  }
  deleteTodoById(targetId: number): Todo | undefined {
    const index = this.todos.findIndex((todo) => todo.id === targetId);

    if (index !== -1) {
      const todo = this.todos[index];
      this.todos.splice(index, 1);
      return todo;
    }
    return undefined;
  }
}
