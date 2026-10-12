import {TodoApi, TodoNotFoundError} from './todo-api';
import {Todo, TodoStatus} from './types';

const NEXT_STATUS: Record<TodoStatus, TodoStatus> = {
  [TodoStatus.PENDING]: TodoStatus.IN_PROGRESS,
  [TodoStatus.IN_PROGRESS]: TodoStatus.COMPLETED,
  [TodoStatus.COMPLETED]: TodoStatus.PENDING,
}

export class TodoService {
  constructor(private readonly api: TodoApi) { }

  async create(title: string, description?: string): Promise<Todo> {
    if (!title || !title.trim()) {
      throw new Error('create: title cannot be empty or contain only whitespaces')
    }
    return this.api.add({
      title: title.trim(),
      ...(description !== undefined ? {description} : {}),
    });
  }

  async toggleStatus(id: number): Promise<Todo> {
    const todos = await this.api.getAll();
    const todo = todos.find((item) => item.id === id);

    if (!todo) {
      throw new TodoNotFoundError(id);
    }
    const nextStatus = NEXT_STATUS[todo.status];
    return this.api.update(id, { status: nextStatus});
  }

  async setStatus(id: number, status: TodoStatus): Promise<Todo> {
    return this.api.update(id, {status});
  }

  async search(keyword: string): Promise<Todo[]> {
    const todos = await this.api.getAll();
    const key = keyword.toLowerCase();

    return todos.filter((todo) => {
      const inTitle = todo.title.toLowerCase().includes(key);
      const inDescription = todo.description ? todo.description.toLowerCase().includes(key) : false;
      return inTitle || inDescription;
    })
  }
}
