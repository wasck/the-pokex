import { dividersOf } from "@shared/util-pokedex-helper";

/**
 * @prop offset the current page number
 * @prop size the size of items per page
 * @prop sizeOptions array of sizes per page
 * @prop count the maximum number of all items
 */
export interface Page {
  page: number;
  size: number;
  sizeOptions: Array<number>;
  count: number;
}

/**
 * @param page current page settings
 * @param items current items for this page
 */
export interface Paginated<T> {
  page: Page;
  items: Array<T>
}

export const DEFAULT_PAGE: Page = {
  page: 0,
  size: 10,
  sizeOptions: dividersOf(5),
  count: 0
}
