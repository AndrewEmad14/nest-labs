export class Todo {
  static currentIdCount = 0;
  id: number;
  task: string;
  status: 'todo' | 'in-progress' | 'done';
  constructor(task: string, status: 'todo' | 'in-progress' | 'done') {
    this.id = Todo.currentIdCount++;
    this.task = task;
    this.status = status;
  }
}
