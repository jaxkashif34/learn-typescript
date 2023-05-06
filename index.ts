// 1) we can use the same name for interfaces but not for types and class. Additionally interfaces types are merged automatically
// 2) we can use extends keyword to extend other interfaces and also other types (for types we have to use different name keyword ) in case of class we can use extends keyword to extend other classes. we can also extends types from other types
// 3) Syntax: type is defined using the type keyword, followed by a name and a type definition, whereas interface is defined using the interface keyword, followed by a name and a set of properties and methods.
// 4) Extensibility: Interfaces can be extended by other interfaces or classes using the extends keyword, while types cannot be extended.
// 5) Reusability: Types can be used to define unions, intersections, and other advanced types, which can be used in multiple places in your code. Interfaces, on the other hand, can only be used to define object types.
// 6) Aliasing: Types can be used to create aliases for existing types, while interfaces cannot. This means that you can create a new name for an existing type using the type keyword.
// 7) we can use dynamic keys in interfaces wo that we can maintain required keys and optional keys
interface Person {
    name: string;
    age: number;
    [key: string]: any;
  }
  // ------>  Functions <--------
  const pow = (x: number, y: number): string => {
    return Math.pow(x, y).toString();
  };
  pow(12, 3);
  // ------> Generics <---------
  
  const a1: Array<string> = ['1', '@', '4'];
  const a2: Array<number> = [1, 3, 4];
  
  type Job = {
    name: string;
    start: () => void;
    state: 'incomplete' | 'success' | 'failure';
  };
  
  type JobRun<J extends Job> = {
    job: J;
    state: 'queued' | 'running' | 'complete';
    onComplete: (cb: (job: J) => void) => void;
  };
  
  type SendEmailJob = Job & {
    recipientEmail: string;
    subject: string;
  };
  
  function enqueueJob<T extends Job>(job: T): JobRun<T> {
    //   can you explain me why job parameter only have job fields and not have recipientEmail and subject fields
    // because we are using generic type T which is extending Job type and Job type does not have recipientEmail and subject fields
    return {
      job,
      state: 'queued',
      onComplete: (cb: (job: T) => void) => cb(job),
    };
  }
  
  const j: SendEmailJob = {
    recipientEmail: 'kashif@gmail.com',
    subject: 'hello',
    name: 'Front-End Developer',
    start: () => {
      console.log('started');
    },
    state: 'incomplete',
  };
  
  const run = enqueueJob(j);
  
  run.onComplete((job) => {
    // console.log(job.name);
  });
  
  // ------->  More on Generics <---------
  
  const simpleState = (initial: string): [() => string, (v: string) => void] => {
    let val: string = initial;
    return [
      () => val,
      (v: string) => {
        val = v;
      },
    ];
  };
  // Q: can you explain me why we are using generics ?
  // Ans: This is the function without generics and this function can only accept string type let's say we want to use this function for number type as well then we have to create another function for number type and this is not good practice so we can use generics to make this function more generic so that we can use this function for any type
  
  // now we can use this function for any type with the help of generics
  
  const simpleStateGenerics = <T>(initial: T): [() => T, (v: T) => void] => {
    let val: T = initial;
    return [
      () => val,
      (v: T) => {
        val = v;
      },
    ];
  };
  
  const [setter, getter] = simpleStateGenerics(1);
  // console.log(setter());
  // getter(2);
  // console.log(setter());
  
  // override the type of generics
  // why we are getting error here ?
  // because we are using generics and we are using generics for number type and we are trying to pass string type.
  const [setter1, getter1] = simpleStateGenerics<string | number>(2);
  // console.log(setter1());
  // getter1('string');
  // console.log(setter1());
  
  // ------->  More on Generics <---------
  
  interface Rank<RankItem> {
    item: RankItem;
    rank: number;
  }
  const ranker = <RankItem>(items: RankItem[], rank: (value: RankItem) => number): RankItem[] => {
    const ranks: Rank<RankItem>[] = items.map((item) => ({ item, rank: rank(item) }));
    ranks.sort((a, b) => a.rank - b.rank);
    return ranks.map((rank) => rank.item);
  };
  
  type Pokemon = {
    name: string;
    hp: number;
  };
  
  const pokemons: Pokemon[] = [
    { name: 'Bulbasaur', hp: 200 },
    { name: 'Megasaur', hp: 30 },
  ];
  
  const ranks = ranker(pokemons, ({ hp }) => hp);
  // console.log(ranks);
  
  // ------> Regex <-------
  const regex: RegExp = /foo/;
  
  // ------>  Maps <---------
  
  // if we want to use dynamic keys we have to use Record (build-in) type Record<key, value>
  const ids: Record<number, string> = {
    10: 'a',
    20: 'b',
  };
  ids[30] = 'c';
  // console.log(ids);
  