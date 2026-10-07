import {Todo, TodoStatus} from './types';

// export function toggleAll(state: Todo[], completed: boolean): Todo[] {
//   if (!state) {
//     throw new Error('toggleAll: not implemented');
//   }
//   return state.map((todo) => {...todo, status: completed ? TodoStatus.COMPLETED : TodoStatus.PENDING,});
// }

export function toggleAll(state: Todo[], completed: boolean): Todo[] {
  const newStatus = completed ? TodoStatus.COMPLETED : TodoStatus.PENDING;

  return state.map((todo) => ({
    ...todo,
    status: newStatus,
  }));
}

export function clearCompleted(state: Todo[]): Todo[] {
  if (!state) {
    throw new Error('clearCompleted: not implemented');
  }
  // let todos = state;
  return state.filter((todo) => todo.status !== TodoStatus.COMPLETED)
}

export function countByStatus(state: Todo[], status: TodoStatus): number {
  if (!state) {
    throw new Error('countByStatus: not implemented');
  }
  return state.filter((todo) => todo.status === status).length;
}
