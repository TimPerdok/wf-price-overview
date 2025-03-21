import { useEffect, useState } from "react";

export enum WindowVarKey {
  hasFetchedItems = "hasFetchedItems",
}

type setValue<T> = (v: T) => void;

export default function useLocalStorage<T extends any>(
  key: WindowVarKey,
  initialValue: T,
) {
  const [value, setValue]: [v: T, setValue: setValue<T>] = useState<T>(
    window.wfStorage?.[key] || initialValue,
  );

  useEffect(() => {
    if (!window.wfStorage) window.wfStorage = {};
    window.wfStorage[key] = value;
  }, [key, initialValue]);

  // Sync local storage with state
  const setState: setValue<T> = (newValue: T) => {
    setValue(newValue);
    window.wfStorage[key] = newValue;
  };

  return [value, setState] as const;
}
