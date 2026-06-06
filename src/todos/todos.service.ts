import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(newTodo);
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id); // Reuses existence check

    // Merge updates into our existing entity
    const updatedTodo = this.todoRepository.merge(todo, updateTodoDto);
    return await this.todoRepository.save(updatedTodo);
  }

  async remove(id: number): Promise<{ message: string }> {
    const todo = await this.findOne(id); // Reuses existence check
    await this.todoRepository.remove(todo);
    return { message: `Todo with ID ${id} successfully deleted` };
  }
}
