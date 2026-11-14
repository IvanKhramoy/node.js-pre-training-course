import React, { useState } from 'react';
import { Todo } from '../../types';

/**
 * Task 3: AddToDo Component
 * 
 * Theory: React Hooks - useState
 * 
 * React Hooks are functions that allow you to "hook into" React state and lifecycle features
 * from function components. useState is the most fundamental hook for managing component state.
 * 
 * useState Hook:
 * - Returns an array with two elements: [state, setState]
 * - First element is the current state value
 * - Second element is a function to update the state
 * - State updates trigger component re-renders
 * 
 * State Management Best Practices:
 * 1. Never modify state directly (mutate the state object)
 * 2. Always use the setter function provided by useState
 * 3. State updates are asynchronous
 * 4. React batches state updates for performance
 * 5. Use functional updates when new state depends on previous state
 * 
 * Event Handling in React:
 * - Use camelCase for event handlers (onClick, onChange, onSubmit)
 * - Event handlers receive a synthetic event object
 * - Prevent default behavior with event.preventDefault()
 * - Access input values through event.target.value
 * 
 * Key Concepts:
 * - State is component-specific and isolated
 * - State changes cause re-renders
 * - Use controlled components for form inputs
 * - Handle form submission properly
 */
export const AddToDo: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTitle('');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add todo"
          value={title}
          onChange={onChange}
        />
        <button type="submit">Add todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}; 