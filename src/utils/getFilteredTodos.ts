import type { Filter, Todo } from '../types/todo';

export function getFilteredTodos(todos: Todo[], filter: Filter): Todo[] {
  switch (filter) {
    case 'active':
      return todos.filter((todo: Todo): boolean => !todo.completed);
    case 'completed':
      return todos.filter((todo: Todo): boolean => todo.completed);
    case 'all':
      return todos;
  }
}
