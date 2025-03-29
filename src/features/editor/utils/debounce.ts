/* eslint-disable */
export function debounce<T extends Function>(func: T, wait: number) {
  let h: NodeJS.Timeout;

  const callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => func(...args), wait);
  };

  return <T>(<any>callable);
}
