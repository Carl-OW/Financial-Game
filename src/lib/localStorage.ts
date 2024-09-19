import { Config } from "../type/config";
import type { Storage } from "../type/users";

const initConfig: Config = {
  getEmail: false,
};

export function getFromLocalStorage(key: string): Storage | Config {
  if (key === "admin") {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(initConfig));
      return initConfig;
    }
    return JSON.parse(localStorage.getItem(key)!) as Config;
  }
  if (key === "user") {
    // Changed from 'quiz' to 'user' to handle user data
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
