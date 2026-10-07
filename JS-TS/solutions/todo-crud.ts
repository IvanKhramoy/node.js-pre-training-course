import { Todo } from './types';

export function addTodo(state: Todo[], todo: Todo): Todo[] {
  return [...state, todo];
}

export function updateTodo(state: Todo[], id: number, update: Partial<Omit<Todo, 'id' | 'createdAt'>>): Todo[] {
  const exists = state.some((todo) => todo.id === id);
  if (!exists) {
    throw new Error('updateTodo: attempting to update non-existing todo');
  }
  return state.map((todo) => todo.id === id ? {...todo, ...update} : todo);
}

export function removeTodo(state: Todo[], id: number): Todo[] {
  const exists = state.some((todo) => todo.id === id);
  if (!exists) {
    throw new Error('removeTodo: attempting to update non-existing todo');
  }
  return state.filter((todo) => todo.id !== id);
}

export function getTodo(state: Todo[], id: number): Todo | undefined {
  const todo = state.find(todoItem => todoItem.id === id);
  if (!todo) {
    throw new Error('getTodo: attempting to access non-existing todo');
  }
  return todo;
}
