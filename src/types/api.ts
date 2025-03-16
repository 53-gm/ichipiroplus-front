/**
 * ページネーションレスポンス
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * クエリパラメータ
 */
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}
