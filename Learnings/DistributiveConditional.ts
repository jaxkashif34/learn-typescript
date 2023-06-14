type FormResponse =
  | {
      id: string;
      type: 'checkbox';
      value: boolean;
    }
  | {
      id: string;
      type: 'text';
      value: string;
    };

type MyOmit<T, K extends keyof T> = T extends T ? Omit<T, K> : never;
type RenderFormResponse = MyOmit<FormResponse, 'id'>;

declare const f: RenderFormResponse;

if (f.type === 'checkbox') {
  f.value; // boolean
} else {
  f.value; // string
}

type ASimpleUnion = 'checkbox' | undefined | 'text' | number;

type A1 = Array<ASimpleUnion>; // equivalent to Array<string | number>
// same as
type A2 = Array<string | number>;

const a1Example: A1 = ['checkbox', 'checkbox', 'text', 12, undefined, /* false */ ]; // we can't use boolean here because we don't have boolean in ASimpleUnion

// but what if we want to create a type that is an array of string or number but not both
// we can do this by using distributive conditional type
type A3 = Array<string> | Array<number>; // we want to create like this then we need to use distributive conditional type

type A4 = ASimpleUnion extends string ? ASimpleUnion : never; // this will return never because not all element in a ASimpleUnion is a string we are not distributing we are still treating it as a single unit

// however things changed when we combine a generic and a conditional type like this:
type OnlyString<T> = T extends string ? T : never; // this will return string because we are distributing the type T

type A5 = OnlyString<ASimpleUnion>; // this will return only string because we are distributing the type ASimpleUnion A4 still return never because we are not distributing the type in A4
// basically we are filter out that was't a string
// we treated each of the element in ASimpleUnion individually in A5

// let's combe back to the original example instead of creating an array that could be anyone of the array e.g. ASimpleUnion[] we want to create a union of each type wrapped in an array e.g. string[] number[]

// we need to combine the both the conditional type and generic type but here is a catch what would be the condition
// so actually we don't need a condition we are just triggering the distributive behavior of the type

type ToArray<T> = T extends T ? Array<T> : never;

// Adding this line later we have to pass a union in the generic parameters we shoul not do it like pass the type Object and then get the keys of that object in this way it will not work.

// ******like this (will not triger distributive behaviour)****
type C = { name: string; age: number }
// @ts-expect-error
type A<T> = T extends T ? Array<keyof T> : never // here we are making union of keys of T generic
type B = A<C>;
// ******like this (will not triger distributive behaviour)****

type A6 = ToArray<ASimpleUnion>; // 🎇😵 here it works

// now let's make the our first example works

// what if we don't want to trigger the distribution but while still using these complex mechanics
// we can do this by wrapping the both sides of an extends in tuple [T] extends [T]

type ToArrayWithOutDistribution<T> = [T] extends [T] ? Array<T> : never;

type A7 = ToArrayWithOutDistribution<ASimpleUnion>; // this will return Array<ASimpleUnion> because we are not triggering the distribution
