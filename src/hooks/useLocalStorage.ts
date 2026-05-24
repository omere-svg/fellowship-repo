import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

type UseLocalStorageOptions<T> = {
  serialize?: (value: T) => string;
  deserialize?: (raw: string) => T;
};

export type UseLocalStorageReturn<T> = [
  T,
  Dispatch<SetStateAction<T>>,
];

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {},
): UseLocalStorageReturn<T> {
  const serialize = options.serialize ?? JSON.stringify;
  const deserialize = options.deserialize ?? JSON.parse;

  const [storedValue, setStoredValue] = useState<T>((): T => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        return initialValue;
      }
      return deserialize(raw);
    } catch {
      return initialValue;
    }
  });

  useEffect((): void => {
    try {
      localStorage.setItem(key, serialize(storedValue));
    } catch {
      // Ignore quota or serialization errors.
    }
  }, [key, storedValue, serialize]);

  return [storedValue, setStoredValue];
}
