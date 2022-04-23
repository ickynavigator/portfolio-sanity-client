/* eslint-disable import/prefer-default-export */

/** Insert an element into an array at a specific index and return the new array */
export const insert = <T = any>(
  arr: T[],
  index: number,
  ...newItems: T[]
): T[] => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted items
  ...newItems,
  // part of the array after the specified index
  ...arr.slice(index),
];
