import type { ReactElement } from 'react';

type TodoFooterProps = {
  activeCount: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
};

export function TodoFooter({
  activeCount,
  hasCompleted,
  onClearCompleted,
}: TodoFooterProps): ReactElement {
  const itemLabel = activeCount === 1 ? 'item' : 'items';

  return (
    <footer className="todo-footer">
      <span className="todo-count" role="status">
        {activeCount} {itemLabel} left
      </span>
      {hasCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
}
