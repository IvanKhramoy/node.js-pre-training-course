import { Todo, NewTodo } from './types';
import {createTodo} from "./todo-factory";
import {InMemoryRepository} from "./repository";

const delay = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.floor(Math.random() * 301) + 300)
  })
}

export class TodoApi {
  constructor(private readonly repo = new InMemoryRepository<Todo>()) {}

  // private todos: Todo[] = [];

  async getAll(): Promise<Todo[]> {
    await delay();
    return [...this.repo.findAll()];
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await delay();
    const todo = createTodo(newTodo);
    this.repo.add(todo);
    return todo;
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    await delay();
    try {
      return this.repo.update(id, update);
    } catch {
      throw new TodoNotFoundError(id);
    }
  }

  async remove(id: number): Promise<void> {
    await delay();
    try {
      this.repo.remove(id);
    } catch {
      throw new TodoNotFoundError(id);
    }
  }
}

export class TodoNotFoundError extends Error {
  readonly id: number;
  constructor(id: number) {
    super(`Todo with id ${id} not found`);
    this.name = 'TodoNotFoundError';
    this.id = id;
  }
}