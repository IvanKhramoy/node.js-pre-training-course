import {NewTodo, Todo, TodoStatus} from './types';

let nextId = 1;

export function createTodo(input: NewTodo): Todo {
  return {
    ...input,
    id: nextId++,
    createdAt: new Date,
    status: TodoStatus.PENDING,
  }
  // throw new Error('createTodo: not implemented');
}
