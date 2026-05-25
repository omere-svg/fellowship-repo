import {
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactElement,
} from 'react';
import type { Todo, TodoId } from '../types/todo';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: TodoId) => void;
  onEdit: (id: TodoId, text: string) => void;
  onDelete: (id: TodoId) => void;
};

export function TodoItem({
  todo,
  onToggle,
  onEdit,
  onDelete,
}: TodoItemProps): ReactElement {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.title);
  const didSaveRef = useRef<boolean>(false);

  const startEditing = (): void => {
    didSaveRef.current = false;
    setEditText(todo.title);
    setIsEditing(true);
  };

  const saveEdit = (): void => {
    if (didSaveRef.current) {
      return;
    }
  
    didSaveRef.current = true;
  
    const trimmed = editText.trim();
    if (trimmed === '') {
      onDelete(todo.id);
    } else {
      onEdit(todo.id, trimmed);
    }
  
    setIsEditing(false);
  };
  
  const cancelEdit = (): void => {
    setEditText(todo.title);
    setIsEditing(false);
  };
  
  const handleEditKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      saveEdit();
    }
    if (event.key === 'Escape') {
      cancelEdit();
    }
  };

  if (isEditing) {
    return (
      <li className="todo-item editing">
        <input
          className="todo-edit"
          type="text"
          value={editText}
          onChange={(event: ChangeEvent<HTMLInputElement>): void =>
            setEditText(event.target.value)
          }
          onBlur={saveEdit}
          onKeyDown={handleEditKeyDown}
          autoFocus
          aria-label={`Edit todo: ${todo.title}`}
        />
      </li>
    );
  }

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <input
        className="todo-toggle"
        type="checkbox"
        checked={todo.completed}
        onChange={(): void => onToggle(todo.id)}
        aria-label={`Mark "${todo.title}" as ${
          todo.completed ? 'incomplete' : 'complete'
        }`}
      />
      <label className="todo-label" onDoubleClick={startEditing}>
        {todo.title}
      </label>
      <button
        type="button"
        className="todo-edit-btn"
        onClick={startEditing}
        aria-label={`Edit "${todo.title}"`}
      >
        Edit
      </button>
      <button
        type="button"
        className="todo-delete"
        onClick={(): void => onDelete(todo.id)}
        aria-label={`Delete "${todo.title}"`}
      >
        ×
      </button>
    </li>
  );
}
