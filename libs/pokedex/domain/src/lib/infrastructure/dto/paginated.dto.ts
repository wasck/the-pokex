export interface PaginatedDto<T> {
  count: number;
  next?: string;
  previous?: string;
  results: Array<T>
}
