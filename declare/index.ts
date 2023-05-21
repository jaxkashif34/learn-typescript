export type DeclareFunction = <T>(arg: T) => T;
declare const declareFunction: DeclareFunction;
declareFunction(12);
// if we declare a function in a file then we can't define the function body in the same file we have to define it in another file and if we want to define the function body in the same file then i think we have to use the function overloading
