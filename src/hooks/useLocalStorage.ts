import {
  useEffect,
  useRef,
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
  const serializeRef = useRef(options.serialize ?? JSON.stringify);
  const deserializeRef = useRef(options.deserialize ?? JSON.parse);

  const [storedValue, setStoredValue] = useState<T>((): T => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) {
        return initialValue;
      }
      return deserializeRef.current(raw);
    } catch {
      return initialValue;
    }
  });

  useEffect((): void => {
    try {
      localStorage.setItem(key, serializeRef.current(storedValue));
    } catch {
      // Ignore quota or serialization errors.
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}