export type TodoId = string;

export type Todo = {
  id: TodoId;
  text: string;
  completed: boolean;
};

export type Filter = 'all' | 'active' | 'completed';
