import { Todo, NewTodo } from './types';
import {createTodo} from "./todo-factory";

const delay = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.floor(Math.random() * 301) + 300)
  })
}

export class TodoApi {
  private todos: Todo[] = [];

  async getAll(): Promise<Todo[]> {
    await delay();
    return [...this.todos];
  }

  async add(newTodo: NewTodo): Promise<Todo> {
    await delay();
    const todo = createTodo(newTodo);
    this.todos.push(todo);
    return todo;
  }

  async update(id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    await delay();
    const index = this.todos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new TodoNotFoundError(id);
    }
    const updatedTodo = { ...this.todos[index], ...update };
    this.todos[index] = updatedTodo;
    return updatedTodo;
  }

  async remove(id: number): Promise<void> {
    await delay();
    const index = this.todos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new TodoNotFoundError(id);
    }
    this.todos.splice(index, 1);
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