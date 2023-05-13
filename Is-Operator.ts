(function () {
  type Species = 'cat' | 'dog';

  // type also should try interface

  interface Pet {
    species: Species;
  }

  class Cat implements Pet {
    public species: Species = 'cat';
    public meow(): void {
      console.log('Meow');
    }
  }

  function petIsCat(pet: Pet): pet is Cat {
    return pet.species === 'cat';
  }

  function petIsCatBoolean(pet: Pet): boolean {
    return pet.species === 'cat';
  }

  const p: Pet = new Cat();

  // p.meow()  // ERROR: Property 'meow' does not exist on type 'Pet'.

  if (petIsCat(p)) {
    p.meow(); // now compiler knows for sure that the variable is of type Cat and it has meow method
  }

  if (petIsCatBoolean(p)) {
    // p.meow()  // now compiler knows for sure that the variable is of type Cat and it has meow method
  }

  // By using the is operator and a user-defined type guard function, we can narrow the type of the animal variable in the if block to just Dog. This allows us to call the bark method of the Dog object without getting a type error.

  interface Dog {
    name: string;
    bark(): void;
  }

  // The isDog function returns a boolean value, but more importantly, it has a special return type of obj is Dog. This tells TypeScript that if the function returns true, then the argument is a Dog object.
  function isDog(obj: any): obj is Dog {
    return obj && typeof obj.name === 'string' && typeof obj.bark === 'function';
  }

  function makeDogSpeak(animal: Dog | string) {
    if (isDog(animal)) {
      animal.bark();
    } else {
      console.log(`Sorry, ${animal} cannot bark.`);
    }
  }
})();
