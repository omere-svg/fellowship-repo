import type { ReactElement } from 'react';
import type { Todo, TodoId } from '../types/todo';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  emptyMessage: string;
  onToggle: (id: TodoId) => void;
  onEdit: (id: TodoId, text: string) => void;
  onDelete: (id: TodoId) => void;
};

export function TodoList({
  todos,
  emptyMessage,
  onToggle,
  onEdit,
  onDelete,
}: TodoListProps): ReactElement {
  if (todos.length === 0) {
    return (
      <p className="todo-empty" role="status">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo: Todo): ReactElement => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
