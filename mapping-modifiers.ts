(function () {
  // Removes 'readonly' attributes from a type's properties
  type CreateMutable<Object_Type> = {
    -readonly [keys in keyof Object_Type]: Object_Type[keys];
  };
  type LockedAccount = {
    readonly id: string;
    readonly name: string;
  };

  type UnlockedAccount = CreateMutable<LockedAccount>; // now we can mutate the LockedAccount

  // Remove 'optional' from a type's properties

  type Concrete<Object_Type> = {
    [properties in keyof Object_Type]-?: Object_Type[properties];
  };

  type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
  };

  type User = Concrete<MaybeUser>; // now there is no any optional fields in User Type

  //   Key Remapping via "as" with template literals
  // properties will convert into get[PropertyName] and if we want to change the type of properties also we need to change whatever property we want we can replace them like given below (replace with boolean each property in below) and then what Object we pass will convert into boolean value like in given below (but there a bug in this approach if a property have also a object property like location : { latitude: string, longitude: string }) then this code will replace the location property into boolean instead of converting there sub-property into boolean so we have to modify it
  //   type MapTypeWithNewProperties<Object_Type> = {
  //     [property in keyof Object_Type as `get${Capitalize<property & string>}`]: boolean;
  //   };
  type MapTypeWithNewProperties<Object_Type> = {
    [property in keyof Object_Type as `get${Capitalize<property & string>}`]: Object_Type[property];
  };
  // this type will be used when creating properties for the sub-properties of the object properties of the original object type
  type MapTypeWithNewPropertiesAndSubProperties<Object_Type> = {
    [property in keyof Object_Type as `get${Capitalize<property & string>}`]: Object_Type[property] extends object
      ? {
          [subProperty in keyof Object_Type[property] as `get${Capitalize<subProperty & string>}`]: boolean;
        }
      : boolean;
  };

  type MapUser = {
    name: string;
    age: number;
    location: {
      latitude: number;
      longitude: number;
    };
  };

  type GetUser = MapTypeWithNewPropertiesAndSubProperties<MapUser>;

  // Remove the property from Object Type

  type RemoveProperty<Object_Type> = {
    [property in keyof Object_Type as Omit<property, 'kind'> & string]: Object_Type[property];
  };

  interface Circle {
    kind: 'circle';
    radius: number;
  }

  type KindLessCircle = RemoveProperty<Circle>; // In this type we remove the kind property from Circle type

  //   const circle: Circle = {
  //     kind: 'circle',
  //     radius: 10,
  //   };

  type EventConfig<Events extends { kind: string }> = {
    // Question: what above line of code is doing ?
    // Answer: it is creating a type which have a property of kind and the value of kind is string
    // Question: it's ensuring that whatever we provide to EventConfig it must have kind property ?
    // Answer: Yes
    [E in Events as E['kind']]: (event: E) => void;
    // Question: what above line of code is doing ?
    // Answer: it is creating a type which have a property of kind and the value of kind is string and the value of kind is a function which take a parameter of type E and return void
    // Question: what is E in above line of code ?
    // Answer: it is a generic type which is extending the Events type and Events type is a type which have a property of kind and the value of kind is string
    // Question: what is E['kind'] in above line of code ?
    // Answer: it is a type which is a string
    // Question: why we use as E['kind'] ?
    // Answer: because we want to use the value of kind property as a key of the object
    // Question: is E iterates over each property of Events and assign each property a name of whatever comes from kind value. Am I right correct me if i'm wrong ?
    // Answer: Yes
    // Question: when E iterates over Event the possible value of E might beSquareEvent or CircleEvent. Am I right ?
    // Answer: Yes
    // Question: when E iterates over Event what might be the possible value of E ?
    // Answer: it might be SquareEvent or CircleEvent
  };

  type SquareEvent = { kind: 'square'; x: number; y: number };
  type CircleEvent = { kind: 'circle'; radius: number };

  type Config = EventConfig<SquareEvent | CircleEvent>; // In this type we have a object which have two functions which accepts a parameter of type SquareEvent and CircleEvent and return void respectively
  const config: Config = {
    circle: (e) => e.radius,
    square: (e) => e.x,
  };

  //   Mapped type with Conditional type

  type ExtractPII<Object_Type> = {
    [property in keyof Object_Type]: Object_Type[property] extends { pii: true } ? true : false;
  };

  //   extends { pii: true } this is used to ensure that if the provided Object_Type have that property with same data-type

  type DBFields = {
    id: { format: 'incrementing' };
    name: { type: string; pii: true };
  };

  type ObjectNeedingGDPRDeletion = ExtractPII<DBFields>;
})();
