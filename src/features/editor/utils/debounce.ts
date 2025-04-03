// biome-ignore lint/complexity/noBannedTypes: <explanation>
export function debounce<T extends Function>(func: T, wait: number) {
  let h: NodeJS.Timeout;

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => func(...args), wait);
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return <T>(<any>callable);
}
