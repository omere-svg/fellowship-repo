import { useMemo, type ReactElement } from 'react';
import { useTodos } from '../hooks/useTodos';
import type { Todo } from '../types/todo';
import { getFilteredTodos } from '../utils/getFilteredTodos';
import { TodoFilters } from './TodoFilters';
import { TodoFooter } from './TodoFooter';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

export function TodosApp(): ReactElement {
  const {
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
  } = useTodos();

  const visibleTodos = useMemo(
    (): Todo[] => getFilteredTodos(todos, filter),
    [todos, filter],
  );

  const showFooter = todos.length > 0;

  const emptyMessage =
    todos.length === 0
      ? 'No todos yet. Add one above!'
      : 'No todos match this filter.';

  return (
    <div className="todo-app">
      <header className="todo-header">
        <h1>todos</h1>
        <TodoInput onAdd={addTodo} />
      </header>

      <main className="todo-main">
        <TodoList
          todos={visibleTodos}
          emptyMessage={emptyMessage}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />
      </main>

      {showFooter && (
        <section className="todo-controls">
          <TodoFooter
            activeCount={activeCount}
            hasCompleted={hasCompleted}
            onClearCompleted={clearCompleted}
          />
          <TodoFilters filter={filter} onFilterChange={setFilter} />
        </section>
      )}
    </div>
  );
}
