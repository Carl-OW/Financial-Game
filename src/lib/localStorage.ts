import { Config } from '../type/config';
import type { Storage } from '../type/users';

export function getFromLocalStorage(key: string): Storage {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : {};
}

export function addToLocalStorage(key: string, data: Storage | Config) {
  const localStorageObject = getFromLocalStorage(key);

  localStorage.setItem(key, JSON.stringify({ ...localStorageObject, ...data }));
}

export function clearAllLocalStorage() {
  localStorage.clear();
}
