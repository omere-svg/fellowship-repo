import { useCallback, useState } from 'react';
import type { Filter, Todo, TodoId } from '../types/todo';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'my-todos';

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.id === 'string' &&
    typeof record.text === 'string' &&
    typeof record.completed === 'boolean'
  );
}

function parseTodos(raw: string): Todo[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item: unknown): item is Todo => isTodo(item));
  } catch {
    return [];
  }
}

function createId(): string {
  return crypto.randomUUID();
}

export type UseTodosResult = {
  todos: Todo[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  activeCount: number;
  hasCompleted: boolean;
  addTodo: (text: string) => void;
  toggleTodo: (id: TodoId) => void;
  editTodo: (id: TodoId, text: string) => void;
  deleteTodo: (id: TodoId) => void;
  clearCompleted: () => void;
};

export function useTodos(): UseTodosResult {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, [], {
    deserialize: parseTodos,
  });
  const [filter, setFilterState] = useState<Filter>('all');

  const setFilter = useCallback((next: Filter): void => {
    setFilterState(next);
  }, []);

  const addTodo = useCallback((text: string): void => {
    const trimmed = text.trim();
    if (trimmed === '') {
      return;
    }
    const newTodo: Todo = {
      id: createId(),
      text: trimmed,
      completed: false,
    };
    setTodos((current: Todo[]): Todo[] => [...current, newTodo]);
  }, [setTodos]);

  const toggleTodo = useCallback((id: TodoId): void => {
    setTodos((current: Todo[]): Todo[] =>
      current.map((todo: Todo): Todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, [setTodos]);

  const editTodo = useCallback((id: TodoId, text: string): void => {
    const trimmed = text.trim();
    if (trimmed === '') {
      return;
    }
    setTodos((current: Todo[]): Todo[] =>
      current.map((todo: Todo): Todo =>
        todo.id === id ? { ...todo, text: trimmed } : todo,
      ),
    );
  }, [setTodos]);

  const deleteTodo = useCallback((id: TodoId): void => {
    setTodos((current: Todo[]): Todo[] =>
      current.filter((todo: Todo): boolean => todo.id !== id),
    );
  }, [setTodos]);

  const clearCompleted = useCallback((): void => {
    setTodos((current: Todo[]): Todo[] =>
      current.filter((todo: Todo): boolean => !todo.completed),
    );
  }, [setTodos]);

  const activeCount = todos.filter((todo: Todo): boolean => !todo.completed)
    .length;
  const hasCompleted = todos.some((todo: Todo): boolean => todo.completed);

  return {
    todos,
    filter,
    setFilter,
    activeCount,
    hasCompleted,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
  };
}
