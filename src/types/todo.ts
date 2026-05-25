export type TodoId = string;

export type Todo = {
  id: TodoId;
  title: string;
  completed: boolean;
};

export type TodoFilterOptions = 'all' | 'active' | 'completed';
