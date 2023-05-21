type A2<T> = (param: T) => T;
type B = <T>(param: T) => T;
// Question: tell me if I'm wrong or not! return type of B is whatever we pass in the generic parameter ?
// Answer: yes, you are right
// Question: can you tell me what is the return type of B ?
// Answer: B is a function that takes a generic type as an argument and return that generic type

declare const a: A2; // Error: Generic type 'A' requires 1 type argument(s).
declare const aNum: A2<number>;
declare const aStr: A2<string>;

declare const b: B;
declare const bIsNotGeneric: B<number>; // Error:Type 'B' is not generic.

const numToNum: A2<number> = (x: number) => {
  return x + 10;
};
const strToStr: A2<string> = (x: string) => {
  return x + 'string';
};
type Obj = {
  name: string;
  age: number;
};

const data: Obj = {
  name: 'Kashif',
  age: 22,
};

const objToObj = (data: Obj): Obj => data;
const objToObj2: A2<Obj> = (data: Obj): Obj => data;

const objData = objToObj(data);
const objData2 = objToObj2(data);

const identity: B = <T>(x: T) => {
  // we have to add "," to remove errors
  return x;
};

const result: Obj = identity(data);

interface GenericInterfaceForFunction<T> {
  (x: T): T;
}

interface InterfaceForGenericFunction {
  <T>(x: T): T;
}

const ouput: GenericInterfaceForFunction<Obj> = (data: Obj) => {
  return data;
};
const ouput2: InterfaceForGenericFunction = <Obj>(data: Obj) => {
  return data;
};

export {}