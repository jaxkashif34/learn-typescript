type Point = { x: number; y: number };
type P = keyof Point; //    ^ = type P = "x" | "y"
type P1 = keyof Point[]; // ^ = type P = "length" | "toString" | "pop" | "push" | "concat" | ...
type P2 = keyof { [x: string]: Point }; // ^ = type P = string
// Question: why type P is string ?
// Answer: because the key of { [x: string]: Point } is string
// Question: If { [x: string]:Point } what will be the type if this was the case ?
// Answer: type P = number
// Question: why type P is number ?
// Answer: because the key of { [x: number]: Point } is number

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

type Mapish = { [k: string]: boolean };
type M = keyof Mapish; //
// Question: is M type a string or number or union of both ?
// Answer: M type is a string
// Question: why M type is a string ?
// Answer: because the key of { [k: string]: boolean } is string
