import type { ReactElement } from 'react';
import type { Filter } from '../types/todo';

type TodoFiltersProps = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
};

const FILTERS: Filter[] = ['all', 'active', 'completed'];

function labelFor(filter: Filter): string {
  if (filter === 'all') {
    return 'All';
  }
  if (filter === 'active') {
    return 'Active';
  }
  return 'Completed';
}

export function TodoFilters({
  filter,
  onFilterChange,
}: TodoFiltersProps): ReactElement {
  return (
    <div className="todo-filters" role="group" aria-label="Filter todos">
      {FILTERS.map((option: Filter): ReactElement => (
        <button
          key={option}
          type="button"
          className={filter === option ? 'filter-btn selected' : 'filter-btn'} 
          onClick={(): void => onFilterChange(option)}
          aria-pressed={filter === option}
        >
          {labelFor(option)}
        </button>
      ))}
    </div>
  );
}
