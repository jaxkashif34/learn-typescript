// implement your own custom Utility Type Pick functionality
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

interface Info {
  name: string;
  age: number;
  email?: string;
}

type NewType = MyPick<Info, 'age' | 'name' | 'email'>;

// Question: why we are not using [key in keyof T]?
// Answer: because we want to pick only the keys that are in K
// Question: if we want to pick the keys of K than should not we use keyof?
// Answer: No, because we want to pick the keys of T that are in K
// Question: than when we need to use keyof keyword ?
// Answer: when we want to pick the keys of T
// Question: than what is the difference between [key in keyof T] and [key in K]?
// Answer: [key in keyof T] will pick all the keys of T and [key in K] will pick only the keys of T that are in K
// Question: than what is the difference between [key in keyof T] and [key in T]?
// Answer: [key in keyof T] will pick all the keys of T and [key in T] will pick only the keys of T
