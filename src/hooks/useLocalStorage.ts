import { useEffect, useState } from "react";

export enum LocalStorageKeys {
  items = "items",
  metadata = "metadata",
}

type Serializable = string | number | boolean | null | Serializable[] | { [key: string]: Serializable };

type setValue<T> = (v: T) => void;

export default function useLocalStorage<T extends Serializable>(
  lsKey: LocalStorageKeys,
  initialValue: T,
) {
  const [value, setValue]: [v: T, setValue: setValue<T>] = useState<T>(
    localStorage.getItem(lsKey)
      ? JSON.parse(localStorage.getItem(lsKey) as string)
      : initialValue,
  );

  // Sync state with local storage
  useEffect(() => {
    const oldSetItem = localStorage.setItem;
    localStorage.setItem = function () {
      const result = oldSetItem.apply(this, arguments as any);
      // Hook into the setItem method to update the state
      try {
        const [key, value] = arguments;
        if (lsKey !== key) return result;
        setValue(JSON.parse(value));
      } catch (error) {
        console.error(error);
      }
    };
  }, [lsKey, initialValue]);

  // Sync local storage with state
  const setState: setValue<T> = (newValue: T) =>
    localStorage.setItem(lsKey, JSON.stringify(newValue));

  return [value, setState] as const;
}
