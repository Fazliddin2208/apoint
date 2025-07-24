export const useLocalStorage = () => {
    const getItem = <T>(key: string): T | null => {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    };
  
    const setItem = <T>(key: string, value: T): void => {
      localStorage.setItem(key, JSON.stringify(value));
    };
  
    const deleteItem = (key: string): void => {
      localStorage.removeItem(key);
    };
  
    const clearStorage = (): void => {
      localStorage.clear();
    };
  
    return {
      getItem,
      setItem,
      deleteItem,
      clearStorage,
    };
  };
  