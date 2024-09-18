import { Config } from '../type/config';
import type { Storage } from '../type/users';

export function getFromLocalStorage(key: string): Storage | Config {
  if (key === 'admin') {
    return JSON.parse(localStorage.getItem(key)!) as Config;
  }
  if (key === 'quiz') {
    return JSON.parse(localStorage.getItem(key)!) as Storage;
  } else return {};
}

export function addToLocalStorage(key: string, data: Storage | Config) {
  const localStorageObject = getFromLocalStorage(key);

  localStorage.setItem(key, JSON.stringify({ ...localStorageObject, ...data }));
}

export function clearAllLocalStorage() {
  localStorage.clear();
}
