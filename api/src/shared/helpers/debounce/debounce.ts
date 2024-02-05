export function debounce<T extends any[]>(func: (...args: T) => void, timeout: number) {
  let timer: NodeJS.Timeout | null = null;

  return (...args: T) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
