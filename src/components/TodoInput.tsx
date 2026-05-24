import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactElement,
} from 'react';

type TodoInputProps = {
  onAdd: (text: string) => void;
};

export function TodoInput({ onAdd }: TodoInputProps): ReactElement {
  const [value, setValue] = useState<string>('');

  const submit = (): void => {
    if (value.trim() === '') {
      return;
    }
    onAdd(value);
    setValue('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    submit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>): void =>
          setValue(event.target.value)
        }
        onKeyDown={handleKeyDown}
        aria-label="New todo"
      />
    </form>
  );
}
