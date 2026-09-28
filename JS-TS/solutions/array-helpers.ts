/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

// import {suite} from "node:test";

export function mapArray<T, R>(source: readonly T[], mapper: (item: T, index: number) => R): R[] {
  // return source.map((item, index) => mapper(item, index));
  if (source == null) {
    throw new TypeError('mapArray: source cannot be null or undefined');
  }
  const result: R[] = [];
  for (let i = 0; i < source.length; i++) {
    result.push(mapper(source[i], i));
  }
  return result;
}

export function filterArray<T>(source: readonly T[], predicate: (item: T, index: number) => boolean): T[] {
  // return source.filter((item, index) => predicate(item, index));
  if (source == null) {
    throw new TypeError('filterArray: source cannot be null or undefined');
  }
  const result: T[] = [];
  for (let i = 0; i < source.length; i++) {
    if (predicate(source[i], i)) {
      result.push(source[i]);
    }
  }
  return result;
}

export function reduceArray<T, R>(source: readonly T[], reducer: (acc: R, item: T, index: number) => R, initial: R): R {
  // return source.reduce((acc, item, index) => reducer(acc, item, index), initial);
  if (source == null) {
    throw new TypeError('reduceArray: source cannot be null or undefined');
  }
  let acc = initial;
  for (let i = 0; i < source.length; i++) {
    acc = reducer(acc, source[i], i);
  }
  return acc;
}

export function partition<T>(source: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
  if (source == null) {
    throw new TypeError('partition: source cannot be null or undefined')
  }
  const resultArray: [T[], T[]] = [[], []];
  for (const item of source) {
    if (predicate(item)) {
      resultArray[0].push(item);
    } else {
      resultArray[1].push(item);
    }
  };
  return resultArray;
}

export function groupBy<T, K extends PropertyKey>(source: readonly T[], keySelector: (item: T) => K): Record<K, T[]> {
  if (source == null) {
    throw new TypeError('groupBy: source cannot be null or undefined')
  }
  const result = {} as Record<K, T[]>;

  for (const item of source) {
    const key = keySelector(item);
    if (!result[key]) {
      result[key] = [item];
    } else {
      result[key].push(item);
    }
  }
  return result;
}
